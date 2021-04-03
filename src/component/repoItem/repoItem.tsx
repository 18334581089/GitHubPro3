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
  return (
    <View className='card-wrap'>
      <View className='card-top'>
        <View className='info'>
          <View className='name'>
            <View className='index'>{index}</View>
            {data.name}
          </View>
          <View className='description'>{data.description}</View>
        </View>
        <View className='author'>
          <Image src={data.avatar} className='avatar'></Image>
          <View className='author-name'>{data.author}</View>
        </View>
      </View>
      <View className='card-bottom'>
        <View className='meta-item'>
          <Text className='language-color'></Text>
          {data.language || 'null'}
        </View>
        <View className='meta-item'>
          {data.stars}
        </View>
        <View className='meta-item'>
          {data.forks}
        </View>
        <View className='meta-item'>
          {data.currentPeriodStars} stars 今天
      </View>
      </View>
    </View >
  )
}

export default memo(repoItem)