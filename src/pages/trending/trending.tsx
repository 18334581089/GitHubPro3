import React, { useState, useEffect, useRef } from "react"
import Taro, { usePullDownRefresh } from "@tarojs/taro"
import { View, Text, Image, Block } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton, AtDrawer } from "taro-ui"

import { apiTrendList, ITabIndex, ITrendingRequestParams } from "@/services/module/trend"
import { tabList } from "@/util/configData"
import Empty from "@/component/empty/empty"
import MyLanguage from "./lang"

const defaultParams = {
  since: 'daily',
  type: 'repo',
  language: ''
}

const Trending =  () => {
  const [currTab, setCurrTab] = useState<number>(0)
  const [params, setParams] = useState<ITrendingRequestParams>(defaultParams)
  const [repos, setRepos] = useState<ITabIndex>({})
  const [refresh, setRefresh] = useState<number>(0)
  const [showLangDrawer, setShowaLngDrawer] = useState<Boolean>(false)
  const [curLang, setLang] = useState<string>('')

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: curLang })
  }, [curLang])

  usePullDownRefresh(() => {
    setRepos({ [currTab]: null })
    setRefresh(refresh + 1)
  })

  const getRepos = async (param: ITrendingRequestParams) => {
    Taro.showLoading({ title: 'loading...' })
    const res = await apiTrendList(param)
    if (res) {
      if (repos[currTab]) {
        setRepos({ [currTab]: res })
      } else {
        setRepos({
          ...repos,
          [currTab]: res
        })
      }
      Taro.hideLoading()
    } else {
      Taro.showToast({
        title: '数据出错',
        mask: true,
        icon: 'none'
      })
    }
  }

  useEffect(() => {
    getRepos(params)
  }, [params, refresh])

  function handleTabChange(index: number): void {
    setCurrTab(index)
    Taro.pageScrollTo({ scrollTop: 0 })
    if (repos[index]) { return }
    setParams({
      ...params,
      since: tabList[index].value
    })
  }

  function handleLangChange(isShow : boolean) {
    return () => setShowaLngDrawer(isShow)
  }

  function handleChange({title}):void {
    setLang(title)
    setParams({
      ...params,
      language: title
    })
    setShowaLngDrawer(false)
  }

  return (
    <Block>
      <AtButton type='primary' size='small' onClick={handleLangChange(true)}>切换语言</AtButton>
      
      <AtTabs tabList={tabList} onClick={handleTabChange} current={currTab}>
        {tabList.map((_tab, index) => {
          const _repos = repos[currTab] || []
          return (
            <Block key={index}>
              <AtTabsPane current={currTab} index={index}>
                {
                  (_repos.length && _repos.length > 0)
                  ? _repos.map(tab2 => {
                    return (
                      <Block key={tab2.name}>
                        <View><Text>author: </Text><Text>{tab2.author}</Text></View>
                        <View><Text>repoName: </Text><Text>{tab2.name}</Text></View>
                        <View><Image src={tab2.avatar}></Image></View>
                      </Block>
                    )
                  })
                  : <Empty></Empty>
                }
              </AtTabsPane>
            </Block>
          )
        })}
      </AtTabs>

      <AtDrawer 
        show={!!showLangDrawer} 
        onClose={handleLangChange(false)}
        right 
        mask 
      >
        <MyLanguage
          handleChangeLang={handleChange}
          curLang={curLang}
        ></MyLanguage>
      </AtDrawer>
    </Block>
  )
}

export default Trending