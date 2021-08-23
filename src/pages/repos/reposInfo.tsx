import { View, Block, Text } from "@tarojs/components"
import { AtList } from "taro-ui"
import Taro from "@tarojs/taro"
import React from "react"

import Avator from "src/component//avator/avator"
import { getTimeAgo } from "src/util//newsItem_pure"
import ListItem from "src/component//listItem/listItem"
import { Repo } from "src/services//module/repos"
import Empty from "src/component//empty/empty"

import { LANGUAGE_COLOR_MAP } from "./../language/langs"

function bytesToSize(bytes: number | string): string {
  bytes = +bytes
  const sizes = ["B", "KB", "MB", "GB", "TB"]
  if (bytes == 0) return "0 B"
  const i = parseInt("" + Math.floor(Math.log(bytes) / Math.log(1024)))
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i]
}

const renderInfo = (_data: Repo | null) => {
  if (_data === null) {
    return <Empty />
  }
  const {
    name,
    owner,
    description,
    pushed_at,
    size,
    stargazers_count,
    language,
    forks_count,
    open_issues_count,
    license,
    subscribers_count
  } = _data


  const itemList = [
    {
      title: language,
      icon: 'code',
      color: LANGUAGE_COLOR_MAP[language] || '#002eb0',
      extraText: bytesToSize(size)
    },
    {
      title: 'Activity',
      icon: 'activity',
      color: '#F44337',
      extraText: ''
    },
    {
      title: 'Issues',
      icon: 'info',
      color: '#EC407A',
      extraText: open_issues_count
    },
    {
      title: 'License',
      icon: 'book',
      color: '#26ca7e',
      extraText: (license && license.name) || ''
    },
  ]

  const itemList2 = [
    {
      title: 'Commits',
      icon: 'git-commit',
      color: '#2AB09D'
    },
    {
      title: 'Contributors',
      icon: 'people',
      color: '#F99501'
    },
    {
      title: 'Readme',
      icon: 'book-open',
      color: '#3D76FF',
      rightIcon: 'reload'
    },
  ]

  const handleLoginClick = () => {
    const url = '/pages/developer/developer?name=' + owner.login
    Taro.navigateTo({ url })
  }

  return (
    <Block>
      <View className='header'>
        <View onClick={handleLoginClick}>
          <Avator url={owner.avatar_url} />
        </View>
        <View>
          <View className='full-name' onClick={handleLoginClick}>
            <Text className='login'>{owner.login}{'  '}</Text>
            /
            <Text className='name'>{name}</Text>
          </View>
          <View className='description'>{description || ''}</View>
          <View className='meta'>{getTimeAgo(pushed_at)}</View>
        </View>
      </View>

      <View className='divider'></View>
      <View className='repo-num'>
        <View className='num-item'>
          <View className='num'>
            {Number(subscribers_count).toLocaleString()}
          </View>
          <View className='label'>watchs</View>
        </View>
        <View className='num-item'>
          <View className='num'>
            {Number(stargazers_count).toLocaleString()}
          </View>
          <View className='label'>stars</View>
        </View>
        <View className='num-item'>
          <View className='num'>{Number(forks_count).toLocaleString()}</View>
          <View className='label'>forks</View>
        </View>
      </View>

      <View className='repo-info'>
        <AtList hasBorder={false}>
          {
            itemList.map((_item, index) => (
              <Block key={index}> 
                <ListItem
                  title={_item.title}
                  icon={_item.icon}
                  color={_item.color}
                  extraText={_item.extraText}
                  arrow={_item.title === 'License' ? null : 'right'}
                ></ListItem>
              </Block>
            ))
          }
        </AtList>
      </View>

      <View className='repo-info'>
        <AtList hasBorder={false}>
          {
            itemList2.map((_item, index) => (
              <Block key={index}> 
                <ListItem
                  title={_item.title}
                  icon={_item.icon}
                  color={_item.color}
                  rightIcon={_item.rightIcon || ''}
                  arrow={_item.title === "Readme" ? null : 'right'}
                ></ListItem>
              </Block>
            ))
          }
        </AtList>
      </View>
    </Block>
  )
}

export default renderInfo