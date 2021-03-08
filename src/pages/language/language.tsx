import { Block, Button, Input, View } from "@tarojs/components"
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AtCheckbox } from "taro-ui"
import Taro from "@tarojs/taro"

import { UPDATE_LANGS } from "./../../redux/constatnts"
import LANGUAGE_LIST from "./langs"
import { getLanguageData, getLanguageOptions } from "./../../util/pureFn"

export default () => {
  const langs = useSelector<any,any>(state => state.lang.selected)
  const initList = langs.map(item => item.language)
  
  const [options, setOptions] = useState(LANGUAGE_LIST)
  const [lists, setList] = useState(initList)

  const [valInput, setValInput] = useState('')
  
  const handleOnInput = e => {
    const val = e.target.value
    const _list = getLanguageOptions(val)
    setOptions(_list)
    setValInput(val)
  }
  
  const dispatch = useDispatch()
  const handleConfirm = () => {
    dispatch({
      type: UPDATE_LANGS,
      payload: getLanguageData(lists)
    })
    setList(lists)
    Taro.navigateBack()
  }
  return (
    <Block>
      <View>
        <Input
          placeholder='search'
          value={valInput}
          onInput={handleOnInput}
        ></Input>
      </View>
      <View>
        <Button onClick={handleConfirm}>点击确认</Button>
      </View>
      <View>
        <AtCheckbox
          options={options}
          selectedList={lists}
          onChange={setList}
        />
      </View>
    </Block>
  )
}