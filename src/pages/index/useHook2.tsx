import { Button, View } from "@tarojs/components"
import React, {useState} from "react"
import useRequest from "./useRequest"
import {request2} from "./request"

function Index () {
  const [count, setCount] = useState(0)
  const [data1] = useRequest(request2)
  
  // console.log(data1)

  return (
    <View>
      <View>
        you clicked {count} times
      </View>
      <Button onClick={() => setCount(count + 1)}>
        click me
      </Button>
      {
        data1 &&
        data1.data &&
        Object.keys(data1.data).map(v => (
          <View key={v}>{v}</View>
        ))
      }
    </View>
  )
}

export default Index