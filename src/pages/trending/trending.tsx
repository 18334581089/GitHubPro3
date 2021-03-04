import React, { useState, useEffect, useRef } from "react"
import Taro, { usePullDownRefresh } from "@tarojs/taro"
import { View, Text, Image, Block } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtButton, AtDrawer } from "taro-ui"

import { request } from "./request"
import MyLanguage from "./language"

interface IBuiltBy {
  username: string
  href: string
  avatar: string
}
interface ITrendingRepo {
  author: string
  name: string
  avatar: string
  url: string
  description: string
  language?: string
  languageColor?: string
  stars: number
  forks: number
  currentPeriodStars: number
  builtBy: Array<IBuiltBy>
}
interface ITabIndex {
  [propName: string]: Array<ITrendingRepo> | null
}
interface ITrendingRequestParams {
  type: string,
  language: string
  since: string
}
interface ITrendParams {
  [propName: string]: any
}

const tabList = [
  {
    title: 'daily',
    value: 'daily'
  },
  {
    title: 'weekly',
    value: 'weekly'
  },
  {
    title: 'monthly',
    value: 'monthly'
  }
]
const defaultParams = {
  since: 'daily',
  type: 'repo',
  language: ''
}
const languageSelect = [
  { label: 'js', value: 'option1'},
  { label: 'css', value: 'option2'},
  { label: 'html', value: 'option3'},
  { label: 'ts', value: 'option4'},
  { label: 'react', value: 'option5'}
]

export default () => {
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
    setRepos({ [currTab]: null})
    setRefresh(refresh + 1)
  })

  const getRepos = (param: ITrendParams) => {
    Taro.showLoading({ title: 'loading...' })
    request(param).then(res => {
      if (res && res.data) {
        if (repos[currTab]) {
          setRepos({ [currTab]: res.data })
        } else {
          setRepos({  ...repos, [currTab]: res.data })
        }
        Taro.hideLoading()
      } else {
        Taro.showToast({
          title: '数据出错',
          mask: true,
          icon: 'none'
        })
      }
    })
  }

  useEffect(() =>{
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

  function handleLangChange(isShow : boolean):() => void {
    return () => {
      setShowaLngDrawer(isShow)
    }
  }

  function handleChange(lang:string):void {
    setLang(lang)
    setParams({
      ...params,
      language: lang
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
                  _repos
                  ? _repos.map(tab2 => {
                    return (
                      <Block key={tab2.name}>
                        <View><Text>author: </Text><Text>{tab2.author}</Text></View>
                        <View><Text>repoName: </Text><Text>{tab2.name}</Text></View>
                        <View><Image src={tab2.avatar}></Image></View>
                      </Block>
                    )
                  })
                  : <Block></Block>
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
        <MyLanguage handleChange={handleChange}></MyLanguage>
      </AtDrawer>
    </Block>
  )
}
