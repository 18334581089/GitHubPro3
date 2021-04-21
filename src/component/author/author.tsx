import React from "react"
import { View, Image, Text } from "@tarojs/components"

import { ISearchUserItem } from "@/services/module/search";

import './author.scss'

interface IUserProp {
  item: ISearchUserItem
}

const Author = ({item}: IUserProp) => {
  const handleLoginClick = () => console.log(`根据跳转页面developer`)
  
  return (
    <View className='user-item'>
      <View className='author'>
        <Image className='avatar' src={item.avatar_url}></Image>
        <Text className='login' onClick={handleLoginClick}>
          {item.login}
        </Text>
      </View>
    </View>  
  )
}

export default Author