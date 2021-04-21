import React from "react"
import { View, Image } from "@tarojs/components"

import img1 from '@/assets/spidertocat.png'
import img2 from '@/assets/stormtroopocat.png'
import img3 from '@/assets/logo.png'

import "./empty.scss"

const imgData = {
  '0': img1,
  '1': img2,
  '2': img3
}

const Empty = () => {
  const random = Math.round(Math.random() * 2)
  return (
    <View className='wrap'>
      <View className='inner'>
        <Image className='img' src={imgData[random]}></Image>
        <View className='desc'>No Data.</View>
      </View>
    </View>
  )
}

export default Empty