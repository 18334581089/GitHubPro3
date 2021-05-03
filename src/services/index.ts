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
    header: headers
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
          title: '出错了!' + (res.errMsg || "")
        })
        return null
      }
    })
    .catch(err => {
      Taro.showToast({
        title: '请求出错!' + (err.errMsg || "")
      })
      return null
    })
    .finally(() => {
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    })
}

export const get = <T>(url, data = {}, headers = {}):Promise<T> => {
  return request(url, data, 'GET', headers)
}

export const post = <T>(url, data = {}, headers = {}):Promise<T> => {
  return request(url, data, 'POST', headers)
}

export default request