import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import ima1 from './../../assets/stormtroopocat.png'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

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
