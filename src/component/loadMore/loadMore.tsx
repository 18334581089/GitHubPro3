import React from "react"
import { AtLoadMore } from "taro-ui"


const loadMore = ({hasMore}:{ hasMore: Boolean }) => {
  const status = hasMore ? 'loading' : 'noMore'
  return (
    <AtLoadMore
      loadingText='loading...'
      noMoreText='No more data.'
      status={status}
    />
  )
}

export default loadMore