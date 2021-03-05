import { createStore, applyMiddleware } from "redux"
// import { createLogger } from "redux-logger"
// import thunkMiddleware from "redux-thunk"

import reducers from "./reducers"

// let middlewares:Array<any> = [
//   thunkMiddleware
// ]

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(createLogger())
// }

export default function configStore () {
  // return createStore(reducers, applyMiddleware(...middlewares))
  return createStore(reducers)
}
