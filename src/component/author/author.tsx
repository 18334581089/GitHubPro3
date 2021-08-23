import { View, Image, Text } from "@tarojs/components"
import Taro from "@tarojs/taro"
import React from "react"

import { ISearchUserItem } from "src/services//module/search";

import './author.scss'

interface IUserProp {
  item: ISearchUserItem
}

const Author = ({item}: IUserProp) => {
  const handleLoginClick = () => {
    const url = `/pages/developer/developer?name=${item.login}`
    Taro.navigateTo({ url })
  }
  
  return (
    <View className='user-item'>
      <View className='author' onClick={handleLoginClick}>
        <Image className='avatar' src={item.avatar_url}></Image>
        <Text className='login'>
          {item.login}
        </Text>
      </View>
    </View>  
  )
}

export default Author