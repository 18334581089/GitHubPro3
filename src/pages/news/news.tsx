import React, { useEffect, useRef, useState } from "react";
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { Block, Button, View, Text, Image } from "@tarojs/components";
import usePullDownRefreshEvent from "@/hook/usePullDownRefresh"
import Empty from "@/component/empty/empty";
import { getEvents, IDefaultParams } from "@/services/module/news"
import LoadMore from "@/component/loadMore/loadMore"
import useReachBottomEvent from '@/hook/useReachBottomEvent'
import { events } from "@/util/index";
import { PULL_DOWN_REFRESH_EVENT, REACH_BOTTOM_EVENT } from "@/util/configData"

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

  const pageReachBottomRef = useRef('') // 当前页面唯一下拉id
  const pagePullDownRef = useRef('') // 当前页面唯一上拉id
  const loadingRef = useRef(false) // 是否加载中

  usePullDownRefreshEvent() // 顶部下拉hook
  useReachBottomEvent() // 滚动底部hook
  
  const refresh = () => {
    setData([])
    setHasMore(true)
    setParams({ ...params, page: 1 })
  }
  
  const getMoreData = () => {
    setParams(_params => ({ ..._params, page: _params.page! + 1 }))
  }

  useEffect(() => {
    if (hasMore) {
      loadingRef.current = true
      getEvents(params)
      .then(data1 => {
        if (data1) {
          setData([...data, ...data1])
          if (data1.length < params.per_page!) {
            setHasMore(false)
          }
        }
      })
      .finally(() => {
        loadingRef.current = false
        Taro.stopPullDownRefresh()
        Taro.hideLoading()
      })
    }
  }, [params])

  useEffect(() => {
    events.on(REACH_BOTTOM_EVENT, (page: string) => {
      if (loadingRef.current) {
        return
      }
      if (!pageReachBottomRef.current) {
        pageReachBottomRef.current = page
      } else if (pageReachBottomRef.current !== page) {
        return
      }
      getMoreData()
    })
    return () => {
      events.off(REACH_BOTTOM_EVENT)
    }
  })
  
  useEffect(() => {
    events.on(PULL_DOWN_REFRESH_EVENT, (page: string) => {
      if (loadingRef.current) {
        return
      }
      if (!pagePullDownRef.current) {
        pagePullDownRef.current = page
      } else if (pagePullDownRef.current !== page) {
        return
      }
      refresh()
    })
    return () => {
      events.off(PULL_DOWN_REFRESH_EVENT)
    }
  }, [])
  
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