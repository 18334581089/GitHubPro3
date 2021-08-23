import React, { useEffect, useRef, useState } from "react";
import { Block, Button, View, Text } from "@tarojs/components";

// const useMy = (state) => {
//   return obj.current
// }

const News = () => {
  const [count, setCount] = useState(0)
  // const count2 = useMy(count)
  
  const obj = useRef()

  useEffect(() => {
    console.log(count)
    obj && (obj.current = count)
  })
  
  function handle () {
    console.log('123123', count)
    setTimeout(() => {
      let a = count
      console.log(a)
    }, 3000);
  }
  return (
    <Block>
      {/* <Button onClick={() => setCount(count + 1)}>but1</Button>
      <Button onClick={handle}>but2</Button> */}
      <View>{count}</View>
      <View>{obj.current}</View>



      <Button onClick={() => setCount(count + 1)}>but3</Button>
      <Button onClick={() => setCount(count - 1)}>but4</Button>

      <View>news page !!!</View>
    </Block>
  )
}
export default News