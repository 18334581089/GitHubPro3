
// const BASE_URL = 'https://api.github.com'
const BASE_URL = 'https://api-github.naotu.online'// 国内转发

export const TRENDING_URL = 'https://trending-github.naotu.online'

export const isLoading = ({ data }) => {
  const noload = (data && data.page > 1)
  return !noload
}

export const isDev = process.env.NODE_ENV === 'development' && false

export default BASE_URL