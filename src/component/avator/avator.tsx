import React from "react";
import { Image, Block } from "@tarojs/components"

import "./avator.scss"

interface IAvatarProps {
  url: string
  className?: string
  username?: string
  circle?: boolean
  sizeRadius?: string | number
}

const Avatar = (options: IAvatarProps) => {
  const { url, className } = options
  const _class = `avatar ${className}`

  return (
    <Block>
      <Image className={_class} src={url}></Image>
    </Block>
  )
}

export default Avatar