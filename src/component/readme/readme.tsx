import { View } from "@tarojs/components"
import React, { useEffect, useState } from "react"

import { apiGetMD } from "@/services/module/repos"
import Markdown from "@/component/md/md"

import './readme.scss'

interface IReadmeprop { full_name: string }
const Readme = ({ full_name }: IReadmeprop) => {
  const [md, setMd] = useState<string | null>(null)
  
  const apiGetMD2 = () => {
    apiGetMD(full_name).then(res => {
      setMd(res)
    })
  }

  useEffect(apiGetMD2, [])
  
  return (
    <View className='readme'>
      <Markdown full_name={full_name} md={md}></Markdown>
    </View>
  )
}

export default Readme