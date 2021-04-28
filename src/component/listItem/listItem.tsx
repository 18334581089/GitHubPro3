import { View, Text } from "@tarojs/components"
import { AtIcon } from "taro-ui"
import React, { CSSProperties } from "react"
import './listItem.scss'

interface IListItem {
  onClick?: () => void
  icon: string
  title: string
  color: string
  rightIcon?: string
  extraText?: string | number
  arrow?: 'right' | 'left' | 'up' | 'down' | null
}

const ListItem = (prop: IListItem) => {
  const {
    onClick = () => {},
    icon,
    title,
    color,
    extraText = '',
    rightIcon = '',
    arrow = 'right'
  } = prop

  const style1:CSSProperties = {
    padding: '1px',
    marginRight: '10px',
    borderRadius: '50%',
    color: '#fff',
    background: color,
    fontSize: '20px',
    width: '26px',
    height: '26px',
    textAlign: 'center',
    lineHeight: '27px'
  }

  return (
    <View className='item' onClick={onClick}>
      <View className='left'>
        <AtIcon prefixClass='icon' customStyle={style1} value={icon} ></AtIcon>
        {title}
      </View>
      <View className='right'>
        <Text className='extra-text'>{extraText}</Text>
        <AtIcon
          size='20'
          customStyle={{ color: '#409bfc', fontWeight: 500 }}
          value={rightIcon}
        ></AtIcon>
        <AtIcon 
          size='20'
          customStyle={{ color: '#ccc', fontWeight: 400 }}
          value={`chevron-${arrow}`}
        ></AtIcon>
      </View>
    </View>
  )
}

export default ListItem