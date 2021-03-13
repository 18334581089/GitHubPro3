import React, { useEffect, useState } from "react";
import { Block, Button, View, Text } from "@tarojs/components";
import usePullDownRefreshEvent from "@/hook/usePullDownRefresh"
import Empty from "@/component/empty/empty";
import { getEvents, IDefaultParams } from "@/services/module/news"

interface INesItem {
  [propNam:string]: any
}

const defaultParam = {
  per_page: 10,
  page: 1
}

const News = () => {
  const [data, setData] = useState<INesItem[]>([])
  const [params, setParams] = useState<IDefaultParams>(defaultParam)
  
  usePullDownRefreshEvent()

  const getData = async () => {
    const list = await getEvents(params)
    if (list) {
      setData(list)
    }
  }
  
  useEffect(() => {
    getData()
  }, [])
  
  return (
    <Block>
      {
        data.length > 0
        ? data.map((item, index) => {
          return (
            <Block key={index}>
              <View>{item}</View>
            </Block>
          )
        })
        : (<Empty></Empty>)
      }
    </Block>
  )
}
export default News