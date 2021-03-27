import React, { useEffect, useState } from "react";
import { View, Image, Block } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import { getSearch, ISearchPrams, IRepoItem } from "@/services/module/search";
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

  const changeHandle = (_val: string) => {
    setVal(_val)
  }

  const actionClickHandle = () => {
    if (!val) { return }
    // 存储历史记录
    setParams({
      ...params,
      q: val,
      page: 1
    })
  }

  const getList = () => {
    if (!params.q) { return }
    getSearch(params).then(res => {
      if (res.items) {
        console.log([...list, ...res.items])
        setList([...list, ...res.items])
      }
    })
  }
  
  useEffect(() => {
    getList()
  }, [params])

  return (
    <Block>
      <AtSearchBar
        onChange={changeHandle}
        onActionClick={actionClickHandle}
        value={val}
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