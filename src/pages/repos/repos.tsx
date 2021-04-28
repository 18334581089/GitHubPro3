import React, { useEffect, useState } from "react"
import { useRouter } from "@tarojs/taro"
import { View, Block } from "@tarojs/components"

import { apiDetailRepos, Repo } from "@/services/module/repos"
import Readme from "@/component/readme/readme"
import renderInfo from './reposInfo'
import "./repos.scss"

const Repos = () => {
  const { params: routeParams } = useRouter()
  const _full_name = `${routeParams.owner}/${routeParams.repo}`
  const [data, setData] = useState<Repo | null>(null)

  const actionGetData = () => {
    apiDetailRepos(_full_name).then(res => {
      setData(res)
    })
  }

  useEffect(actionGetData, [])

  return (
    <View className='wrap'>
      <View className='repo'>
        <Block>{ renderInfo(data) }</Block>
        <Readme full_name={_full_name} />
      </View>
    </View>
  )
}

export default Repos