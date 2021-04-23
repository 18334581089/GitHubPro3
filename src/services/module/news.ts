import { get } from "../index"
import BASE_URL from "../config"

interface Actor {
  id: number
  login: string
  display_login: string
  gravatar_id: string
  url: string
  avatar_url: string
}
interface Payload {
  action?: string
  ref?: string
  ref_type?: string
  master_branch?: string
  description?: string
  pusher_type?: string
  push_id?: number
  size?: number
  distinct_size?: number
  head?: string
  before?: string
  commits?: any
  forkee?: any
  issue?: any
  comment?: Comment
  repository?: any
  number?: number
  pull_request?: any
  sender?: any
  member?: any
  pages?: any
  release?: any
}
interface Org {
  id: number
  login: string
  gravatar_id: string
  url: string
  avatar_url: string
}
interface Repo {
  id: number
  name: string
  url: string
}
const url = BASE_URL + '/events'

export interface IUserReceivedEvent {
  id: string
  type: string
  actor: Actor
  repo: Repo
  payload: Payload
  public: boolean
  created_at: string
  org?: Org
}

export interface IDefaultParams {
  per_page?: number
  page?: number
}

export const getEvents = (params:IDefaultParams) => {
  return get<IUserReceivedEvent | null>(url, params)
}