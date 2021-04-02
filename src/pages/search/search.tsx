import React, { useEffect, useState } from "react";
import { View, Image, Block } from "@tarojs/components";
import { AtSearchBar, AtSegmentedControl, AtTag } from "taro-ui";
import { getSearch, getSearchUser, ISearchPrams, IRepoItem, ISearchUserItem } from "@/services/module/search";
import Empty from "@/component/empty/empty";
import { TagInfo } from "taro-ui/types/tag";
import Taro from "@tarojs/taro"

const defaultParams: ISearchPrams = {
  q: '',
  sort: '',
  order: '',
  per_page: 10,
  page: 1
}

const Search = () => {
  // const [searchValue, setSearchValue] = useState('')

  const [val, setVal] = useState<string>('')
  const [params, setParams] = useState<ISearchPrams>(defaultParams)
  const [list1, setList1] = useState<IRepoItem[]>([])
  const [list2, setList2] = useState<ISearchUserItem[]>([])

  const [current, setCurrent] = useState<number>(0)
  const [history, setHistory] = useState<string[]>([])

  const changeHandle = (_val: string) => {
    setVal(_val)
  }

  const actionClickHandle = () => {
    if (!val) { return }
    // 这里加代码: 存储历史记录
    setParams({
      ...params,
      q: val,
      page: 1
    })
  }

  const historyHandle = (str: string) => {
    if (history.includes(str)) { return }
    const newHistory = [...history, str]
    Taro.setStorageSync('search_history', newHistory)
    setHistory(newHistory)
  }

  const getList = () => {
    if (!params.q || !val) { return }
    historyHandle(params.q)
    if (current) {
      getSearchUser(params).then(res => {
        if (res.items) {
          setList2([...list2, ...res.items])
        }
      })
    } else {
      getSearch(params).then(res => {
        if (res.items) {
          setList1([...list1, ...res.items])
        }
      })
    }
  }

  useEffect(getList, [params, current])
  useEffect(() => {
    const _history = Taro.getStorageSync('search_history')
    if (_history.length > 0) {
      setHistory(_history)
    }
  }, [])

  const clickHandle = (name: TagInfo) => {

  }

  const backList = (_current: number) => {
    if (_current === 1 && list2.length > 0) {
      return (
        list2.map((_item, index) => (
          <View key={index}>
            <Image src={_item.avatar_url}></Image>
          </View>
        ))
      )
    } else if (_current === 0 && list1.length > 0) {
      return (
        list1.map((_item, index) => (
          <View key={index}>
            <Image src={_item.owner.avatar_url}></Image>
          </View>
        )))
    } else {
      return (<Empty />)
    }
  }

  return (
    <Block>
      <AtSearchBar
        onChange={changeHandle}
        onActionClick={actionClickHandle}
        value={val}
      />
      <View>
        {
          history.map(_item => (
            <AtTag name={_item} onClick={clickHandle} key={_item}>
              {_item}
            </AtTag>
          ))
        }
      </View>
      <AtSegmentedControl
        values={['Repositories', 'Users']}
        onClick={setCurrent}
        current={current}
      />
      {
        backList(current)
      }
    </Block>
  )
}

export default Search