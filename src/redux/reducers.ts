import { combineReducers } from "redux"
import Taro from "@tarojs/taro"

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

const initData = {
  selected: Taro.getStorageSync('selected') || defaultData
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