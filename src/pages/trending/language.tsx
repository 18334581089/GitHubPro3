import { Block, View } from "@tarojs/components"
import { useSelector } from "@tarojs/redux"
import { AtIcon } from "taro-ui"
import Taro from "@tarojs/taro"
import React from "react"

interface IComProps {
  handleChangeLang: (params: { title: string }) => void
  curLang: string
}

const handleIconClick = () => {
  Taro.navigateTo({ url: '/pages/language/language' })
}

const MyLanguage = ({ handleChangeLang, curLang }: IComProps) => {
  const langs = useSelector<any, any>(state => state.lang.selected)

  const handleClick = e => {
    const data = e.target.dataset
    handleChangeLang(data)
  }

  return (
    <Block>
      <View>
        <AtIcon value='edit' onClick={handleIconClick}></AtIcon>
      </View>
      {
        langs.map(item => {
          return (
            <Block key={item.title}>
              <View onClick={handleClick} data-title={item.title}>
                {
                  item.title === curLang
                    ? item.title
                    : ("→" + item.title)
                }
              </View>
            </Block>
          )
        })
      }
    </Block>
  )
}
export default MyLanguage