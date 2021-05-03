import React, { useEffect, useState } from "react"
import { View, Image, Block } from "@tarojs/components"
import { useRouter } from "@tarojs/taro"
import { AtButton, AtList } from "taro-ui"

import { apiGetUser, IUser } from "@/services/module/user"
import { getTimeAgo } from "@/util/newsItem_pure"
import ListItem from "@/component/listItem/listItem"

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
      id,
      node_id,
      avatar_url,
      gravatar_id,
      url,
      html_url,
      followers_url,
      following_url,
      gists_url,
      starred_url,
      subscriptions_url,
      organizations_url,
      repos_url,
      events_url,
      received_events_url,
      type,
      site_admin,
      company = '',
      blog = '',
      location = '',
      email = '',
      hireable,
      bio = '',
      public_repos,
      public_gists,
      followers = 0,
      following = 0,
      created_at,
      updated_at
    } = userInfo!

    return (
      <View className='wrap'>
        <View className='header'>
          <Image className='avatar' src={avatar_url}></Image>
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
          <ListItem
            // hasBorder
            icon='activity'
            arrow='right'
            title='Activity'
            color='#3B85F6'
          />
            <ListItem
              // hasBorder
              icon='star'
              arrow='right'
              title='Starred'
              color='#01b09d'
            />

          <ListItem
            // hasBorder={false}
            arrow='right'
            title='Issues'
            icon='info'
            // @ts-ignore
            color='#EC407A'
          />
        </View>

        <View className='info'>
          <ListItem
            arrow={null}
            // hasBorder
            title='Email'
            icon='email'
            color='#F99501'
            extraText={email}
          ></ListItem>
          <ListItem
            arrow={null}
            // hasBorder
            title='Blog'
            icon='link'
            color='#3F9FFF'
            extraText={blog}
          ></ListItem>
          <ListItem
            arrow={null}
            icon='people'
            // hasBorder
            title='Company'
            color='#F44337'
            extraText={company}
          ></ListItem>
          <ListItem
            icon='location'
            arrow={null}
            // hasBorder={false}
            title='Location'
            color='#2F63CD'
            extraText={location}
          ></ListItem>
        </View>
          <Block>
            <View className='info'>
              <AtList hasBorder={false}>
                  <ListItem
                    icon='star'
                    color='#ff0012'
                    // @ts-ignore
                    // hasBorder
                    // arrow="right"
                    title='Support'
                  />
                <ListItem
                  icon='fankui'
                  color='#ff9324'
                  // hasBorder
                  arrow='right'
                  title='Feedback'
                />
                <ListItem
                  icon='guanyu'
                  color='#f23d7a'
                  arrow='right'
                  title='About'
                />
              </AtList>
            </View>
          </Block>
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
