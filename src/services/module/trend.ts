import { get } from "../index"
import { TRENDING_URL } from "../config"

export const trendList = (params: ITrendingRequestParams) => {
  return get(TRENDING_URL, params)
}

interface IBuiltBy {
  username: string
  href: string
  avatar: string
}
interface ITrendingRepo {
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