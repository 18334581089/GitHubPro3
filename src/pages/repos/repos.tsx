import React, { useEffect, useState } from "react"
import { useRouter } from "@tarojs/taro"
import { View, Block, Text } from "@tarojs/components"
import { AtList } from "taro-ui"

import { apiDetailRepos, Repo } from "@/services/module/repos"
import Empty from "@/component/empty/empty"
import Avator from "@/component/avator/avator"
import { getTimeAgo } from "@/component/newsItem/newsItem_pure"

import "./repos.scss"

const Repos = () => {
  const { params: routeParams } = useRouter()

  const [data, setData] = useState<Repo | null>(null)

  const actionGetData = () => {
    apiDetailRepos(`${routeParams.owner}/${routeParams.repo}`).then(res => {
      setData(res)
    })
  }

  useEffect(actionGetData, [])

  const renderInfo = _data => {
    const {
      name,
      owner,
      description,
      pushed_at,
      size,
      stargazers_count,
      language,
      forks_count,
      open_issues_count,
      license,
      subscribers_count
    } = _data

    return (
      <Block>
        <View className='header'>
          <Avator url={owner.avatar_url} />
          <View>
            <View className='full-name'>
              <Text className='login'>{owner.login}{'  '}</Text>
              /
              <Text className='name'>{name}</Text>
            </View>
            <View className='description'>{description || ''}</View>
            <View className='meta'>{getTimeAgo(pushed_at)}</View>
          </View>
        </View>

        <View className='divider'></View>
        <View className='repo-num'>
          <View className='num-item'>
            <View className='num'>
              {Number(subscribers_count).toLocaleString()}
            </View>
            <View className='label'>watchs</View>
          </View>
          <View className='num-item'>
            <View className='num'>
              {Number(stargazers_count).toLocaleString()}
            </View>
            <View className='label'>stars</View>
          </View>
          <View className='num-item'>
            <View className='num'>{Number(forks_count).toLocaleString()}</View>
            <View className='label'>forks</View>
          </View>
        </View>


        <View className='repo-info'>
          <AtList hasBorder={false}></AtList>
        </View>

        <View className='repo-info'>
          <AtList hasBorder={false}></AtList>
        </View>
      </Block>
    )
  }

  return (
    <View>
      {data ? renderInfo(data) : <Empty />}
    </View>
  )
}

export default Repos