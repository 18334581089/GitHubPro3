import { get } from "../index"
import BASE_URL from "../config"

const url = BASE_URL + '/events'

export interface IDefaultParams {
  per_page?: number
  page?: number
}

export const getEvents = (params:IDefaultParams) => {
  return get(url, params)
}