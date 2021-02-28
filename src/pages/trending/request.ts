import Taro from "@tarojs/taro"
import { baseUrl } from "../../servies/config"

type Method =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'

export const request = (params: any):Promise<any> => {
  const option = {
    url: baseUrl,
    data: params,
    method: 'GET' as Method,
  }
  return Taro.request(option)
}