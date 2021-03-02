import React, { useState, useEffect, useRef } from "react"
import { connectSocket, usePullDownRefresh } from "@tarojs/taro"
import { View, Text, Image, Block, Button } from '@tarojs/components';
import { AtTabs, AtTabsPane } from "taro-ui"

import { request } from "./request"

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

export default () => {
  const [currTab, setCurrTab] = useState<number>(0)
  const [params, setParams] = useState<ITrendingRequestParams>(defaultParams)
  const [repos, setRepos] = useState<ITabIndex>({})
  const [refresh, setRefresh] = useState<number>(0)
  const countRef = 0

  useEffect(() => {
    if (repos[currTab]) { return }
    setParams({ ...params, since: tabList[currTab].value })
  }, [currTab])

  useEffect(() => {
    getRepos(params)
  }, [params])

  useEffect(() => {
    getRepos(params, {})
  }, [refresh])

  // usePullDownRefresh(() => {
  //   setRefresh(refresh + 1)
  // })

  function handle2 () {
    setRefresh(refresh + 1)
  }

  function handleStatusChange(index: number): void {
    setCurrTab(index)
  }

  function getRepos(param: any, repos1 = repos) {
    // request(param).then(res => {
      const res = {data: {}}
      if (res && res.data) {
        setRepos({
          ...repos1,
          [currTab]: res.data
        })
      }
    // })
  }

  return (
    <Block>
      <Block>
        <Button onClick={handle2}>点击增加刷新值</Button>
      </Block>
      <AtTabs tabList={tabList} onClick={handleStatusChange} current={currTab}>
        {tabList.map((_tab, index) => {
          const _repos = repos[currTab] || []
          return (
            <AtTabsPane key={index} current={currTab} index={index}>
              {_repos && _repos.map && _repos.map(tab2 => {
                return (
                  <Block key={tab2.name}>
                    <View><Text>author: </Text><Text>{tab2.author}</Text></View>
                    <View><Text>repoName: </Text><Text>{tab2.name}</Text></View>
                    <View><Image src={tab2.avatar}></Image></View>
                  </Block>
                )
              })}
            </AtTabsPane>
          )
        })}
      </AtTabs>
    </Block>
  )
}
