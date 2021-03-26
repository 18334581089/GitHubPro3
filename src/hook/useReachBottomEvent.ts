import {
  useReachBottom,
} from '@tarojs/taro'
import { useRef } from "react"
import { events } from "@/util/index"
import { REACH_BOTTOM_EVENT } from "@/util/configData"

const getUniqueId = () => {
  return Math.random()
    .toString(36)
    .substr(2)
}

function useReachBottomEvent() {
  const pageRef = useRef(getUniqueId())
  const timerRef = useRef(0)

  useReachBottom(() => {
    const prev = timerRef.current
    const curr = +Date.now()
    if (prev && (curr - prev < 1500)) { return }
    events.trigger(REACH_BOTTOM_EVENT, pageRef.current)
    timerRef.current = curr
  })

  return null
}

export default useReachBottomEvent
