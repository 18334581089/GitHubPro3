import React, { useState, useEffect, useRef } from "react"
import Taro, { usePullDownRefresh } from "@tarojs/taro"
import { View, Text, Image, Block } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton, AtDrawer } from "taro-ui"

import { apiTrendList, ITabIndex, ITrendingRepo, ITrendingRequestParams } from "@/services/module/trend"
import { tabList, PULL_DOWN_REFRESH_EVENT } from "@/util/configData"
import { events } from "@/util/index"
import RepoItem from "@/component/repoItem/repoItem"
import Empty from "@/component/empty/empty"

import MyLanguage from "./lang"

const defaultParams = {
  since: 'daily',
  type: 'repo',
  language: ''
}

const Trending = () => {
  const [currTab, setCurrTab] = useState<number>(0)
  const [params, setParams] = useState<ITrendingRequestParams>(defaultParams)
  const [repos, setRepos] = useState<ITabIndex>({})
  const [refresh, setRefresh] = useState<number>(0)
  const [showLangDrawer, setShowaLngDrawer] = useState<Boolean>(false)
  const [curLang, setLang] = useState<string>('')
  const pagePullDownRef = useRef('')

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: curLang || 'ALL' })
  }, [curLang])

  usePullDownRefresh(() => {
    setRepos({ [currTab]: null })
    setRefresh(refresh + 1)
  })

  const actionGetData = async (param: ITrendingRequestParams) => {
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
    events.on(PULL_DOWN_REFRESH_EVENT, (page: string) => {
      if (!pagePullDownRef.current) {
        pagePullDownRef.current = page
      } else if (pagePullDownRef.current !== page) {
        return
      }
      actionGetData(params)
    })
    return () => {
      events.off(PULL_DOWN_REFRESH_EVENT)
    }
  }, [])

  useEffect(() => {
    actionGetData(params)
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

  function handleLangChange(isShow: boolean) {
    return () => setShowaLngDrawer(isShow)
  }

  function handleChange({ title }): void {
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
        {tabList.map((_tab, _index1) => {
          const _repos = repos[currTab] || []
          return (
            <Block key={_index1}>
              <AtTabsPane current={currTab} index={_index1}>
                {
                  _repos.length > 0
                    ? _repos.map((tab2, _index2) => <RepoItem key={tab2.url} index={_index2} data={tab2} />)
                    : <Empty />
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