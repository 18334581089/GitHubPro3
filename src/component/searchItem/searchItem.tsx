import Taro from '@tarojs/taro'
import { View, Text, Image, ITouchEvent } from '@tarojs/components'
import React, { memo } from 'react'

import { IRepoItem } from "@/services/module/search"
import './index.scss'

interface RepoItemProps {
  repo: IRepoItem
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

  const handleLoginClick = () => {
    const url = '/pages/developer/developer?name=' + login
    Taro.navigateTo({ url })
  }

  const handleCardClick = () => {
    const url = `/pages/repos/repos?owner=${login}&repo=${name}`
    Taro.navigateTo({ url })
  }

  return (
    <View className='repo-wrap' onClick={handleCardClick}>
      <View onClick={handleLoginClick}>
        <Image className='avatar' src={avatar_url}></Image>
      </View>
      <View className='info'>
        <View className='top'>
          <Text className='name' onClick={handleLoginClick}>{name}</Text>
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
          <View className='meta-item'>
            {login}
          </View>
        </View>
      </View>
    </View>
  )
}

const areEqual = (prevRepo: RepoItemProps, repo : RepoItemProps) => {
  return prevRepo && prevRepo.repo.full_name === repo.repo.full_name
}

export default memo(RepoItem, areEqual)
