import React, { useEffect, useState } from "react"
import { useRouter } from "@tarojs/taro"
import { View, Image } from "@tarojs/components"

import { apiDetailRepos, Repo } from "@/services/module/repos"
import Empty from "@/component/empty/empty"

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
      <View>
        <View>name: {name}</View>
        <Image src={owner.avatar_url}></Image>
        <View>description: {description}</View>
        <View>pushed_at: {pushed_at}</View>
        <View>size: {size}</View>
        <View>stargazers_count: {stargazers_count}</View>
        <View>language: {language}</View>
        <View>forks_count: {forks_count}</View>
        <View>open_issues_count: {open_issues_count}</View>
        <View>license: {license.url}</View>
        <View>subscribers_count: {subscribers_count}</View>
      </View>
    )
  }

  return (
    <View>
      {data ? renderInfo(data) : <Empty />}
    </View>
  )
}

export default Repos