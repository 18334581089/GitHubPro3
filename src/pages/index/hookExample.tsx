import React, {useState, useEffect} from 'react'
import { View, Button } from '@tarojs/components'

// 21/2/27 使用hooks入门
function Example () { // 大写的函数,当作是组件,如果不是大写,认为是函数,不能使用useState
  const [count, setCount] = useState(0)

  useEffect(() => {// 完成对 DOM 的更改后执行的函数(effect:副作用) 返回函数表示每次都会清空之前的useEffect回调函数,重新创建一个,保证实时更新,不占内存
    // (如果useEffect回调函数里面只是一些静态数据,没有函数也就不应该使用这个清空)
    // componentDidMount 和 componentDidUpdate (每次渲染后调用副作用函数)
    console.log('ok')
    setCount(100)
  })
  // }, []) // 小心使用第二个参数
  
  return (
    <View>
      <View>you clicked {count} times</View>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
    </View>
  )
}

export default Example