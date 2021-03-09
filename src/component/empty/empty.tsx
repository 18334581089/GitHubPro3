import React from "react"
import { View, Image } from "@tarojs/components"

import imgUrl from "@/assets/spidertocat.png"

const Empty = () => {
  return (
    <View>
      <Image src={imgUrl}></Image>
      <View>No Data.</View>
    </View>
  )
}

export default Empty