import {
  useReachBottom,
} from '@tarojs/taro'
import { useRef } from "react"
import { events } from "@/util/index"

const REACH_BOTTOM_EVENT = 'REACH_BOTTOM_EVENT'
const THROTTLE_DELAY = 'THROTTLE_DELAY'

const getUniqueId = () => {
  return Math.random()
    .toString(36)
    .substr(2)
}

function useReachBottomEvent() {
  const pageRef = useRef(getUniqueId())
  const timerRef = useRef(0)

  useReachBottom(() => {
    const curr = +Date.now()
    events.trigger(REACH_BOTTOM_EVENT, pageRef.current)
    timerRef.current = curr
  })

  return null
}

export default useReachBottomEvent
