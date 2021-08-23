import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import HookExample from './hookExample'
import './index.scss'
import request from './request'

import ima1 from '/src/assets/stormtroopocat.png'

import UseHook2 from './useHook2'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () {
    request()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Image src={ima1}></Image>
        <HookExample></HookExample>
        <UseHook2></UseHook2>
      </View>
    )
  }
}
