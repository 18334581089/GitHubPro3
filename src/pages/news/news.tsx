import React, { useEffect, useRef, useState } from "react";
import { Block, View } from "@tarojs/components";
import Taro from "@tarojs/taro";

import Empty from "src/component//empty/empty";
import LoadMore from "src/component//loadMore/loadMore"
import NewsItem from "src/component//newsItem/newsItem"
import usePullDownRefreshEvent from "src/hook//usePullDownRefresh"
import useReachBottomEvent from 'src/hook//useReachBottomEvent'
import { getEvents, IDefaultParams, IUserReceivedEvent } from "src/services//module/news"
import { PULL_DOWN_REFRESH_EVENT, REACH_BOTTOM_EVENT } from "src/util//configData"
import { events } from "src/util//index";

import "./news.scss"

const defaultParam:IDefaultParams = {
  per_page: 10,
  page: 1
}

const News = () => {
  const [data, setData] = useState<IUserReceivedEvent[]>([])
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
  }, [])
  
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
    <View className='content-wrap'>
      {
        data.length > 0
        ? (
          <Block>
            {data.map((item, index) => <NewsItem key={index} item={item} />)}
            <View>
              <LoadMore hasMore={!!true} />
            </View>
          </Block>
        )
        : (<Empty />)
      }
    </View>
  )
}

export default News