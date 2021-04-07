import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import React, { memo } from 'react'

import './newsItem.scss'


const getFormatDate = (rawDate = ""): string => {
  const itemArr = new Date(rawDate).toString().split(" ")
  const m = itemArr[1]
  const d = itemArr[2]
  const y = itemArr[3]
  return `${m} ${d}, ${y}`
}

const getTimeAgo = (rawDate = ""): string => {
  const date = new Date(rawDate)

  const now = new Date().getTime()
  const limit = (now - date.getTime()) / 1e3
  let content = ""
  if (limit < 60) {
    content = "just now"
  } else if (limit >= 60 && limit < 3600) {
    content = Math.floor(limit / 60) + " minutes ago"
  } else if (limit >= 3600 && limit < 86400) {
    content = Math.floor(limit / 3600) + " hours ago"
  } else if (limit >= 86400 && limit < 2592000) {
    content = Math.floor(limit / 86400) + " days ago"
  } else if (limit >= 2592000 && limit < 31104000) {
    content = Math.floor(limit / 2592000) + " months ago"
  } else {
    content = getFormatDate(rawDate)
  }
  return content
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
    const url = `/pages/developer/index?name=${login}`
    Taro.navigateTo({ url })
  }

  const renderEvent = () => {
    const { repo } = item
    return (
      <View>
        <View className='event-desc'>{repo.name}</View>
      </View>
    )

  }
  const handleCardClick = () => {
    Taro.navigateTo({ url: `/pages/repos/index?full_name=${name}` })
  }
  return (
    <View className='item-wrap' onClick={handleCardClick}>
      <Image
        className='avatar'
        src={avatar_url}
      ></Image>
      <Text className='login' onClick={handleLoginClick}>
        {login}
      </Text>
      {!!created_at && (
        <Text className='create-at'>{getTimeAgo(created_at)}</Text>
      )}
      <View className='event-wrap'>{renderEvent()}</View>
    </View>
  )
}

const areEqual = ({ item: prevItem }: any, { item }: any) => {
  return prevItem && prevItem.repo.name === item.repo.name
}

export default memo(ActivityItem, areEqual)


interface Actor {
  id: number
  login: string
  display_login: string
  gravatar_id: string
  url: string
  avatar_url: string
}
interface Payload {
  action?: string
  ref?: string
  ref_type?: string
  master_branch?: string
  description?: string
  pusher_type?: string
  push_id?: number
  size?: number
  distinct_size?: number
  head?: string
  before?: string
  commits?: any
  forkee?: any
  issue?: any
  comment?: Comment
  repository?: any
  number?: number
  pull_request?: any
  sender?: any
  member?: any
  pages?: any
  release?: any
}
interface Org {
  id: number
  login: string
  gravatar_id: string
  url: string
  avatar_url: string
}
interface Repo {
  id: number
  name: string
  url: string
}
interface IUserReceivedEvent {
  id: string
  type: string
  actor: Actor
  repo: Repo
  payload: Payload
  public: boolean
  created_at: string
  org?: Org
}
interface ActivityItemProps {
  item: IUserReceivedEvent
}