import { usePullDownRefresh } from "@tarojs/taro"
import { useRef } from "react"

import { events } from "@/util/index"
import { PULL_DOWN_REFRESH_EVENT } from "@/util/configData"

const getUniqueId = () => {
  return Math.random()
    .toString(36)
    .substr(2)
}


function usePullDownRefreshEvent() {
  const pageRef = useRef(getUniqueId())
  usePullDownRefresh(() => {
    events.trigger(PULL_DOWN_REFRESH_EVENT, pageRef.current)
  })
  return null
}

export default usePullDownRefreshEvent