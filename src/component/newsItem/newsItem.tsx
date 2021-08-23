import { View, Image, Text } from '@tarojs/components'
import React, { memo } from 'react'
import Taro from '@tarojs/taro'

import { IUserReceivedEvent } from "src/services//module/news"
import { getTimeAgo } from "src/util//newsItem_pure"
import './newsItem.scss'


interface ActivityItemProps {
  item: IUserReceivedEvent
}

const ActivityItem = ({ item }: ActivityItemProps) => {
  if (!item) {
    return null
  }

  const {
    actor: { avatar_url, login },
    repo: { name },
    created_at
  } = item

  const handleLoginClick = () => {
    const url = `/pages/developer/developer?name=${login}`
    Taro.navigateTo({
      url
    })
  }

  const handleCardClick = () => {
    const url = `/pages/repos/repos?full_name=${name}`
    Taro.navigateTo({
      url
    })
  }
  
  return (
    <View className='item-wrap' onClick={handleCardClick}>
      <View className='author'>
        <View onClick={handleLoginClick}>
          <Image className='avatar' src={avatar_url}></Image>
        </View>
        <Text className='login' onClick={handleLoginClick}>{login}</Text>
        <Text className='create-at'>{ getTimeAgo(created_at) }</Text>
      </View>
      <View className='event-wrap'>
        <Text className='repo-name'>{name}</Text>
      </View>
    </View>
  )
}

const areEqual = ({ item: prevItem }: any, { item }: any) => {
  return prevItem && prevItem.repo.name === item.repo.name
}

export default memo(ActivityItem, areEqual)

