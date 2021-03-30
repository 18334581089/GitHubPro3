import React, { useEffect, useState } from "react";
import { View, Image, Block } from "@tarojs/components";
import { AtSearchBar, AtSegmentedControl } from "taro-ui";
import { getSearch, getSearchUser, ISearchPrams, IRepoItem } from "@/services/module/search";
import Empty from "@/component/empty/empty";

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
  const [list, setList] = useState<IRepoItem[]>([])

  const [current, setCurrent] = useState<number>(0)

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

  const getList = () => {
    if (!params.q) { return }
    if (current) {
      getSearch(params).then(res => {
        if (res.items) {
          setList([...list, ...res.items])
        }
      })
    } else {
      getSearchUser(params).then(res => {
        if (res.items) {
          setList([...list, ...res.items])
        }
      })
    }
  }

  useEffect(getList, [params])

  useEffect(() => {
    if (!val) { return }
    getList()
  }, [current])

  return (
    <Block>
      <AtSearchBar
        onChange={changeHandle}
        onActionClick={actionClickHandle}
        value={val}
      />
      <AtSegmentedControl
        values={['Repositories', 'Users']}
        onClick={setCurrent}
        current={current}
      />
      {
        list.length > 0
        ? list.map((_item, index) => (
          <View key={index}>
            <Image src={_item.owner.avatar_url}></Image>
          </View>
        ))
        : (<Empty />)
      }
    </Block>
  )
}

export default Search