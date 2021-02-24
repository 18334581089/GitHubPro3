import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

import ima1 from './../../assets/stormtroopocat.png'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () {
    let BASE_URL = 'https://api-github.naotu.online'

    request(BASE_URL + `?type=repo&language=&since=daily`, {}, 'GET')
    function request (
      url: string,
      data?: any,
      headers = {}
    ) {
      Taro.request({
        url,
        data,
        method: 'GET',
        header: {
          Authorization: '',
          ...headers
        }
      }).then(res => console.log(res)).catch(res => console.log(res))
    }

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Image src={ima1}></Image>
      </View>
    )
  }
}
