import { get } from "../index"
import BASE_URL from "../config"

const url = BASE_URL + '/search/repositories'
const url2 = BASE_URL + '/search/users'

export const getSearch = (params:ISearchPrams) => {
  return get<ISearchBack | null>(url, params)
}

export const getSearchUser = (params:ISearchPrams) => {
  return get<ISearchBack2 | null>(url2, params)
}

interface ISearchBack {
  incomplete_results: boolean
  total_count: number
  items: IRepoItem[]
}

interface ISearchBack2 {
  incomplete_results: boolean
  total_count: number
  items: ISearchUserItem[]
}

export interface ISearchPrams {
  per_page: number
  page: number
  q: string
  sort?: string
  order?: string
}


interface License {
  key: string
  name: string
  spdx_id: string
  url?: string
  node_id: string
}

interface Owner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface IRepoItem {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: Owner
  html_url: string
  description?: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage?: string
  size: number
  stargazers_count: number
  watchers_count: number
  language?: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  forks_count: number
  mirror_url?: any
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license?: License
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  permissions: Permissions
  score: number
}

export interface ISearchUserItem {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  score: number
}