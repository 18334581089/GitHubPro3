import React from "react"
import { View, Image } from "@tarojs/components"

import img1 from '/src/assets/spidertocat.png'
import img2 from '/src/assets/stormtroopocat.png'
import img3 from '/src/assets/logo.png'

import "./empty.scss"

const imgData = {
  '0': img1,
  '1': img2,
  '2': img3
}

const Empty = () => {
  const random = Math.round(Math.random() * 2)
  return (
    <View className='empty_wrap'>
      <View className='empty_inner'>
        <Image className='empty_img' src={imgData[random]}></Image>
        <View className='empty_desc'>No Data.</View>
      </View>
    </View>
  )
}

export default Empty