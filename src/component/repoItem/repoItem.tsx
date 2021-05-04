import Taro from "@tarojs/taro"
import React, { memo } from "react"
import { View, Text, Image } from "@tarojs/components"
import { ITrendingRepo } from "@/services/module/trend"

import "./repoItem.scss"

interface Iprop {
  data: ITrendingRepo
  index: number
}

const repoItem = (
  { data, index }: Iprop
) => {

  const {
    name,
    author,
    description,
    avatar,
    language,
    stars,
    forks,
    currentPeriodStars
  } = data

  const handleCardClick = () => {
    const url = `/pages/repos/repos?owner=${author}&repo=${name}`
    Taro.navigateTo({
      url
    })
  }

  const handleLoginClick = () => {
    const url = `/pages/developer/developer?name=${author}`
    Taro.navigateTo({
      url
    })
  }

  return (
    <View className='card-wrap' onClick={handleCardClick}>
      <View className='card-top'>
        <View className='info'>
          <View className='name'>
            <View className='index'>{index}</View>
            {name}
          </View>
          <View className='description'>{description}</View>
        </View>
        <View className='author' onClick={handleLoginClick}>
          <Image src={avatar} className='avatar'></Image>
          <View className='author-name'>{author}</View>
        </View>
      </View>
      <View className='card-bottom'>
        <View className='meta-item'>
          <Text className='language-color'></Text>
          {language || 'null'}
        </View>
        <View className='meta-item'>
          {stars}
        </View>
        <View className='meta-item'>
          {forks}
        </View>
        <View className='meta-item'>
          {currentPeriodStars} stars 今天
      </View>
      </View>
    </View >
  )
}

export default memo(repoItem)