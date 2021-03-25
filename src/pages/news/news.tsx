import React, { useEffect, useRef, useState } from "react";
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { Block, Button, View, Text, Image } from "@tarojs/components";
import usePullDownRefreshEvent from "@/hook/usePullDownRefresh"
import Empty from "@/component/empty/empty";
import { getEvents, IDefaultParams } from "@/services/module/news"
import LoadMore from "@/component/loadMore/loadMore"
import useReachBottomEvent from '@/hook/useReachBottomEvent'

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
  const [hasMore, setHasMore] = useState<boolean>(true) // 是否还有更多
  
  usePullDownRefreshEvent()
  useReachBottomEvent()

  // 上拉
  usePullDownRefresh(() => {
    setData([])
    setHasMore(true)
    setParams({ ...params, page: 1 })
  })

  // 下拉
  useReachBottom(() => {
    setParams({ ...params, page: params.page! + 1 })
  })
  
  useEffect(() => {
    if (hasMore) {
      getEvents(params)
      .then(data1 => {
        debugger
        if (data1) {
          setData([...data, ...data1])
          if (data1.length < params.per_page!) {
            setHasMore(false)
          }
        }
      })
      .finally(() => {
        Taro.stopPullDownRefresh()
        Taro.hideLoading()
      })
    }
  }, [params])
  
  return (
    <Block>
      {
        data.length > 0
        ? (
          <Block>
            {data.map((item, index) => {
              return (
                <Block key={index}>
                  <View>
                    <Image src={item.actor.avatar_url}></Image>
                  </View>
                </Block>
              )
            })}
            <View>
              <LoadMore hasMore={!!true} />
            </View>
          </Block>
        )
        : (<Empty />)
      }
    </Block>
  )
}
export default News