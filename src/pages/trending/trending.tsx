import React, {useState, useEffect} from "react"
import { View, Text, Image, Block } from "@tarojs/components"

import { request } from "./request"

const tabList = ['daily', 'weekly', 'monthly']
const defaultParams = {
  since: 'daily',
  type: 'repo',
  language: ''
}

export default () => {
  const [currTab, setCurrTab] = useState(0)
  const [params, setParams] = useState(defaultParams)
  const [repos, setRepos] = useState([])

  useEffect(() => {
  }, [currTab])

  function handleStatusChange (menuStatus: string, index: number):void {
    setCurrTab(index)
    setParams({...params, since: menuStatus})
  }

  useEffect(() => {
    getRepos(params)
  }, [params])

  function getRepos (param: any) {
    request(param).then(res => {
      if (res && res.data) {
        setRepos(res.data)
      }
    })
  }
  
  return (
    <View>
      {
        tabList.map((v, index) => {
          return (
            <View key={v} onClick={() => handleStatusChange(v, index)}>{v}</View>
          )
        })
      }
      {
        repos.map((v:any, index) => {
          return v && (
            <Block key={index}>
              <View><Text>author: </Text><Text>{v.author}</Text></View>
              <View><Text>repoName: </Text><Text>{v.name}</Text></View>
              <View><Image src={v.avatar}></Image></View>
            </Block>
          )
        })
      }
    </View>
  )
}