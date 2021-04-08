import Taro, { Component, Config, memo } from '@tarojs/taro'
import { View, Text, Image, ITouchEvent } from '@tarojs/components'
import React from 'react'

import './index.scss'

interface RepoItemProps {
  repo: any
}

const RepoItem = ({ repo }: RepoItemProps) => {
  if (!repo) {
    return null
  }
  const {
    name,
    owner: { avatar_url, login },
    description,
    stargazers_count,
    language,
    forks_count,
  } = repo

  const handleNameClick = (e: ITouchEvent) => {
    e.stopPropagation()
    console.log(`根据${login}跳转页面developer`)
    // const url = `/pages/developer/index?name=${login}`
    // Taro.navigateTo({ url })
  }

  const handleCardClick = () => {
    console.log(`根据${login}和${name}跳转页面repos详情`)
    // const url = `/pages/repos/index?owner=${login}&repo=${name}`
    // Taro.navigateTo({ url })
  }

  return (
    <View className='repo-wrap' onClick={handleCardClick}>
      <Image className='avatar' src={avatar_url}></Image>
      <View className='info'>
        <View className='top'>
          <Text className='name'>{name}</Text>
          <Text className='language'>{language || ''}</Text>
          <Text
            className='lang-color'
            style={{ background: '#E8274B' }}
          ></Text>
        </View>
        <View className='desc'>{description || ''}</View>
        <View className='bottom'>
          <View className='meta-item'>
            {stargazers_count}
          </View>
          <View className='meta-item'>
            {forks_count}
          </View>
          <View className='meta-item' onClick={handleNameClick}>
            {login}
          </View>
        </View>
      </View>
    </View>
  )
}

const areEqual = ({ repo: prevRepo }: any, { repo }: any) => {
  return prevRepo && prevRepo.full_name === repo.full_name
}

// export default memo(RepoItem, areEqual)
export default RepoItem
