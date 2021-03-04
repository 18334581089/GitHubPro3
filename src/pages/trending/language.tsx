import { Block, View } from "@tarojs/components"
import React from "react"

interface Language {
  language: string
  title: string
}

// 原本是卸载redux里面的
const defaultLangs: Language[] = [
  {
    language: '',
    title: 'All Languages'
  },
  {
    language: 'java',
    title: 'Java'
  },
  {
    language: 'javascript',
    title: 'JavaScript'
  },
  {
    language: 'typescript',
    title: 'TypeScript'
  }
]

const MyLanguage = ({handleChange}) => (
  <Block>
    {
      defaultLangs.map(item => {
        return (
          <Block key={item.title}>
            <View onClick={() => handleChange(item.title)}>
              {item.title}
            </View>
          </Block>
        )
      })
    }
  </Block>
)
export default MyLanguage