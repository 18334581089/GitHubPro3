
// const BASE_URL = 'https://api.github.com'
// const BASE_URL = 'https://api-github.naotu.online'// 国内转发(很快就不能用了,这个原本是我从github上借鉴的)
const BASE_URL = 'https://v2.kkpp.cc'// 8/23,新的api转发接口

export const TRENDING_URL = 'https://api.github.com'

export const isLoading = ({ data }) => {
  const noload = (data && data.page > 1)
  return !noload
}

export const isDev = process.env.NODE_ENV === 'development' && false

export default BASE_URL