import { combineReducers } from "redux"
import Taro, { getStorageSync } from "@tarojs/taro"

import { UPDATE_LANGS } from "./constatnts"

const defaultData = [
  {
    language: '',
    title: 'All Languages'
  },
  {
    language: 'java',
    title: 'Java'
  },
  {
    language: 'javascript',
    title: 'JavaScript'
  },
  {
    language: 'typescript',
    title: 'TypeScript'
  }
]
console.log(Taro.canIUse)
console.log(getStorageSync)
debugger
const initData = {
  selected: getStorageSync('selected') || defaultData
}

interface IAction {
  type: string
  payload: any
}

const languageReducer = (state = initData, action: IAction) => {
  switch (action.type) {
    case UPDATE_LANGS :
      Taro.setStorageSync('selected', action.payload)
      return {
        selected: action.payload
      }
    default :
      return state
  }
}

export default combineReducers({
  lang: languageReducer
})