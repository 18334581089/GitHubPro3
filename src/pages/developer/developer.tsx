import React, { useEffect, useState } from "react"
import { View, Image, Block } from "@tarojs/components"
import { useRouter } from "@tarojs/taro"
import { AtList } from "taro-ui"

import { apiGetUser, IUser } from "@/services/module/user"
import { getTimeAgo } from "@/util/newsItem_pure"
import ListItem from "@/component/listItem/listItem"

import { itemList2, itemList1, itemList3 } from "./devPure"
import './developer.scss'

const Developer = () => {
  const {
    params: { name }
  } = useRouter()
  const [userInfo, setUserInfo] = useState<IUser | null>(null)


  const getDetail = () => {
    apiGetUser(name as string).then(res => {
      setUserInfo(res)
    })
  }

  useEffect(getDetail, [])

  const renderUserInfo = () => {
    const {
      login,
      avatar_url,
      company = '',
      blog = '',
      location = '',
      email = '',
      bio = '',
      public_repos,
      followers = 0,
      following = 0,
      created_at,
    } = userInfo!

    const extraTextObj = {
      Company: company,
      Blog: blog,
      Location: location,
      Email: email,
    }

    return (
      <View className='wrap'>
        <View className='header'>
          <View>
            <Image className='avatar' src={avatar_url}></Image>
          </View>
          <View className='basic'>
            <View className='name'>
              {name || login} ({login})
            </View>
            <View className='bio'>{bio}</View>
            <View className='Joined'>Joined at {getTimeAgo(created_at)}</View>
          </View>
        </View>
        <View className='divide'></View>
        <View className='info meta'>
          <View className='nav'>
            <View className='nav-item'>
              <View className='item-count'>
                {Number(public_repos).toLocaleString()}
              </View>
              <View className='item-label'>repositories</View>
            </View>
            <View className='nav-item'>
              <View className='item-count'>
                {Number(followers).toLocaleString()}
              </View>
              <View className='item-label'>followers</View>
            </View>
            <View className='nav-item'>
              <View className='item-count'>
                {Number(following).toLocaleString()}
              </View>
              <View className='item-label'>following</View>
            </View>
          </View>
        </View>

        <View className='info'>
          {
            itemList2.map((_item, index) => (
              <Block key={index}>
                <ListItem
                  title={_item.title}
                  icon={_item.icon}
                  color={_item.color}
                ></ListItem>
              </Block>
            ))
          }
        </View>

        <View className='info'>
          {
            itemList1.map((_item, index) => (
              <Block key={index}>
                <ListItem
                  title={_item.title}
                  icon={_item.icon}
                  color={_item.color}
                  arrow={null}
                  extraText={extraTextObj[_item.title]}
                ></ListItem>
              </Block>
            ))
          }
        </View>
        <View className='info'>
          <AtList hasBorder={false}>
            {
              itemList3.map((_item, index) => (
                <Block key={index}>
                  <ListItem
                    title={_item.title}
                    icon={_item.icon}
                    color={_item.color}
                  ></ListItem>
                </Block>
              ))
            }
          </AtList>
        </View>
      </View>
    )
  }
  return (
    <View>
      { userInfo && renderUserInfo()}
    </View>
  )
}

export default Developer
