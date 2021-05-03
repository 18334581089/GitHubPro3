import { View, Image, Text } from '@tarojs/components'
import React, { memo } from 'react'

import { IUserReceivedEvent } from "@/services/module/news"
import { getTimeAgo } from "@/util/newsItem_pure"
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

  const handleLoginClick = () => console.log(`根据${login}跳转页面developer`)
  const handleCardClick = () => {
    const url = `/page/repos/repos?full_name=${name}}`
    Taro.navigateTo({
      url
    })
  }
  
  return (
    <View className='item-wrap' onClick={handleCardClick}>
      <View className='author'>
        <Image className='avatar' src={avatar_url}></Image>
        <Text className='login' onClick={handleLoginClick}>{login}</Text>
        <Text className='create-at'>{ getTimeAgo(created_at) }</Text>
      </View>
      <View className='event-wrap'>
        <View className='event-desc'>{name}</View>
      </View>
    </View>
  )
}

const areEqual = ({ item: prevItem }: any, { item }: any) => {
  return prevItem && prevItem.repo.name === item.repo.name
}

export default memo(ActivityItem, areEqual)

