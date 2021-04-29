import React, { useEffect, useState } from "react"
import { useRouter } from "@tarojs/taro"
import { View, Block } from "@tarojs/components"

import { apiDetailRepos, Repo } from "@/services/module/repos"
import Readme from "@/component/readme/readme"
import renderInfo from './reposInfo'
import "./repos.scss"

const Repos = () => {
  const { params: routeParams } = useRouter()
  const [data, setData] = useState<Repo | null>(null)

  let _full_name = ''
  if (routeParams.full_name) {
    _full_name = routeParams.full_name
  } else if (routeParams.owner && routeParams.repo) {
    _full_name = `${routeParams.owner}/${routeParams.repo}`
  } else {
    return (<Block></Block>)
  }

  const actionGetData = () => {
    apiDetailRepos(_full_name).then(res => {
      setData(res)
    })
  }
  
  actionGetData()

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