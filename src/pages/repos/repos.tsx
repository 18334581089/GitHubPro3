import React, { useEffect, useState } from "react"
import { useRouter } from "@tarojs/taro"
import { View, Block } from "@tarojs/components"

import { apiDetailRepos, Repo } from "@/services/module/repos"
import Readme from "@/component/readme/readme"
import renderInfo from './reposInfo'
import "./repos.scss"

const Repos = () => {
  const { params: {full_name, owner, repo} } = useRouter()
  const [data, setData] = useState<Repo | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  let _full_name = full_name ? full_name :`${owner}/${repo}`

  const actionGetData = () => {
    if (loading) {
      return
    }
    if (!_full_name) {
      return
    }
    setLoading(true)
    apiDetailRepos(_full_name).then(res => {
      setData(res)
      setLoading(false)
    })
  }

  useEffect(actionGetData, [])

  return (
    _full_name
    ? (
      <View className='wrap'>
        <View className='repo'>
          <Block>{ renderInfo(data) }</Block>
          <Readme full_name={_full_name} />
        </View>
      </View>
    )
    : <Block></Block>
  )
}

export default Repos