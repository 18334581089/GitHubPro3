import React, { Component } from 'react'
import { Provider } from 'react-redux'
import 'taro-ui/dist/style/index.scss'

import '@/assets/iconfont/icon.css'
import configStore from "./redux/index"
import './app.scss'

const store = configStore()

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  render () {
    return (
      <Provider store={store}>
        {
          this.props.children
        }
      </Provider>
    )
  }
}

export default App
