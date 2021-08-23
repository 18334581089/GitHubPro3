import { get } from "../index"
import { TRENDING_URL } from "../config"

export const apiTrendList = (params: ITrendingRequestParams | null) => {
  return get<ITabIndex | null>(TRENDING_URL, params || {})
}

interface IBuiltBy {
  username: string
  href: string
  avatar: string
}
export interface ITrendingRepo {
  author: string
  name: string
  avatar: string
  url: string
  description: string
  language?: string
  languageColor?: string
  stars: number
  forks: number
  currentPeriodStars: number
  builtBy: Array<IBuiltBy>
}

export interface ITabIndex {
  [propName: string]: Array<ITrendingRepo> | null
}

export interface ITrendingRequestParams {
  type: string,
  language: string
  since: string
}