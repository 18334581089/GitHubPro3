import Taro from "@tarojs/taro"
import { isLoading } from "./config"

type Method = 'GET' | 'POST'

const request = (
  url: string,
  data: any = {},
  method: Method = 'GET',
  headers = {}
):Promise<any> => {
  
  const option = {
    url,
    data,
    method,
    headers
  }

  if (isLoading(option)) {
    Taro.showLoading({ title: 'loading..' })
  }

  return Taro.request(option)
    .then(res => {
      if (res.statusCode === 200) {
        return res.data
      } else {
        Taro.showToast({
          title: res.errMsg || '出错了!'
        })
        return null
      }
    })
    .catch(err => {
      Taro.showToast({
        title: err.errMsg || '请求出错!'
      })
      return null
    })
    .finally(() => {
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    })
}

export const get = (url, data) => {
  return request(url, data, 'GET')
}

export const post = (url, data) => {
  return request(url, data, 'POST')
}

export default request