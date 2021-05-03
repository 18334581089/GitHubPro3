import { AtSearchBar, AtSegmentedControl, AtTag } from "taro-ui";
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro"
import React, { useEffect, useState } from "react";
import { View, Block } from "@tarojs/components";

import { getSearch, getSearchUser, ISearchPrams, IRepoItem, ISearchUserItem } from "@/services/module/search";
import LoadMore from "@/component/loadMore/loadMore"
import Empty from "@/component/empty/empty";
import Author from "@/component/author/author";

import RepoItem from "@/component/searchItem/searchItem"

const defaultParams: ISearchPrams = {
  q: '',
  sort: '',
  order: '',
  per_page: 10,
  page: 1
}

const Search = () => {
  const [val, setVal] = useState<string>('')
  const [params, setParams] = useState<ISearchPrams>(defaultParams)
  const [list1, setList1] = useState<IRepoItem[]>([])
  const [list2, setList2] = useState<ISearchUserItem[]>([])

  const [current, setCurrent] = useState<number>(0)
  const [history, setHistory] = useState<string[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)

  const actionClickHandle = () => {
    if (!val) { return }
    historyHandle()
    setParams({
      ...params,
      q: val,
      page: 1
    })
  }

  const historyHandle = () => {
    if (!val || history.includes(val)) { return }
    const newHistory = [...history, val]
    Taro.setStorageSync('search_history', newHistory)
    setHistory(newHistory)
  }

  const getList = () => {
    if (!params.q || !val) { return }
    if (current) {
      getSearchUser(params).then(res => {
        if (res && res.items) {
          if (params.page === 1) {
            setList2(res.items)
          } else if (params.page > 1) {
            setList2([...list2, ...res.items])
          }
          if (res.items.length < params.per_page) {
            setHasMore(false)
          }
        }
      })
    } else {
      getSearch(params).then(res => {
        if (res && res.items) {
          if (params.page === 1) {
            setList1(res.items)
          } else if (params.page > 1) {
            setList1([...list1, ...res.items])
          }
          if (res.items.length < params.per_page) {
            setHasMore(false)
          }
        }
      })
    }
  }

  usePullDownRefresh(() => {
    setParams({
      ...params,
      page: 1
    })
  })

  useReachBottom(() => {
    setParams({
      ...params,
      page: params.page + 1
    })
  })

  useEffect(
    getList,
    [params, current]
  )

  useEffect(() => {
    const _history = Taro.getStorageSync('search_history')
    if (_history.length > 0) {
      setHistory(_history)
    }
  }, [])

  const clickHandle = ({ name }) => {
    setVal(name)
    setParams({
      ...params,
      q: name,
      page: 1
    })
  }

  const backList = (_current: number) => {
    if (_current === 1 && list2.length > 0) {
      return (
        <Block>
          {list2.map((_item, index) => <Author key={index} item={_item} />)}
          <LoadMore hasMore={!!hasMore} />
        </Block>
      )
    } else if (_current === 0 && list1.length > 0) {
      return (
        <Block>
          {list1.map((_item, index) => <RepoItem repo={_item} key={index} />)}
          <LoadMore hasMore={!!hasMore} />
        </Block>
      )
      
    } else {
      return <Empty />
    }
  }

  return (
    <Block>
      <AtSearchBar
        onChange={setVal}
        onActionClick={actionClickHandle}
        value={val}
      />
      <View>
        {
          history.map(_item => <AtTag name={_item} onClick={clickHandle} key={_item}> {_item} </AtTag>)
        }
      </View>
      <AtSegmentedControl
        values={['Repositories', 'Users']}
        onClick={setCurrent}
        current={current}
      />
      { backList(current) }
    </Block>
  )
}

export default Search