// import { useState, useEffect } from "@tarojs/react" // 加这个会报错
import { useState, useEffect } from 'react'

function useRequest (
  // params: any,
  // request: (params:any) => Promise<any>
  request: () => Promise<any>
):any {
  const [data1, setData] = useState(null)
  
  useEffect(() => {
    request().then(data => {
      if (data) {
        setData(Object.assign(data1 || {}, data))
      }
    })
  })
  
  return [data1]
}

export default useRequest