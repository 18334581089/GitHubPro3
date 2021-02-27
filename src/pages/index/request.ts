import Taro from '@tarojs/taro'

export default function () {
  // 21/2/ 实验能否直接调用接口
  let BASE_URL = 'https://api-github.naotu.online'

  return request(BASE_URL + `?type=repo&language=&since=daily`, {}, 'GET')
  function request (
    url: string,
    data?: any,
    headers = {}
  ) {
    return Taro.request({
      url,
      data,
      method: 'GET',
      header: {
        Authorization: '',
        ...headers
      }
    })
    .then(res => console.log(res))
    .catch(res => console.log(res))
  }
}
export function request2 () {
  let BASE_URL = 'https://api-github.naotu.online'
  return request(BASE_URL + `?type=repo&language=&since=daily`, {}, 'GET')
  function request (
    url: string,
    data?: any,
    headers = {}
  ) {
    return Taro.request({
      url,
      data,
      method: 'GET',
      header: {
        Authorization: '',
        ...headers
      }
    })
  }
}