import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

export const copyText = (text: string) => {
  Taro.setClipboardData({
    data: `${text}`,
    // @ts-ignore
    success: function(res) {
      Taro.showToast({
        title: `Copy: ${text}`,
        icon: 'none',
        mask: true
      })
    }
  })
}
const githubHttpUrl = `http://github.com`
const githubHttpsUrl = `https://github.com`

const getNavPath = ({ owner, filePath, repo }): string => {
  let url = ''
  if (filePath) {
    const full_name = `${owner}/${repo}`
    if (filePath.startsWith('issues/new')) {
      url = `/pages/issues/create-issue?full_name=${full_name}`
    } else if (/^issues\/\d+/.test(filePath)) {
      const num = filePath.split('/')[1]
      url = `/pages/issues/issue-detail/index?full_name=${full_name}&number=${num}`
    } else if (filePath.startsWith('issues')) {
      url = `/pages/issues/index?full_name=${full_name}`
    } else if (filePath.startsWith('pulls?q=')) {
      // TODO
    } else if (filePath.startsWith('pull')) {
      // TODO
    } else {
      const isFile = /.*\.\w{1,10}$/.test(filePath)
      const path = `/repos/${owner}/${repo}/contents/${filePath}`
      if (isFile) {
        url = `/pages/repos/content/index?url=${path}`
      } else {
        url = `/pages/repos/files/index?url=${path}`
      }
    }
  } else if (repo) {
    url = `/pages/repos/index?owner=${owner}&repo=${repo}`
  } else {
    url = `/pages/developer/index?name=${owner}`
  }
  return url
}
type owner = 'owner' | ''
type repo = 'repo' | ''
type filePath = 'filePath' | ''

export type parseGitHubReturn = [owner, repo, filePath]

export function parseGitHub(url: string): parseGitHubReturn {
  let arr = url.split('/')
  if (arr.length == 4) {
    return [arr[3] as owner, '', '']
  } else if (arr.length == 5) {
    let repo = arr[4]
    if (repo.indexOf('#')) {
      repo = arr[4].split('#')[0]
    }
    return [arr[3] as owner, repo as repo, '']
  } else if (arr.length > 5) {
    const len = (githubHttpsUrl + '/' + arr[3] + '/' + arr[4] + '/').length
    let file = url.slice(len)
    return [arr[3] as owner, arr[4] as repo, file as filePath]
  }
  return ['', '', '']
}

export function isGitHubPage(url) {
  return url.startsWith(githubHttpUrl) || url.startsWith(githubHttpsUrl)
}
function mdLink(text, link) {
  return '[' + text + '](' + link + ')'
}

interface MarkDownProps {
  md: string | null
  full_name: string
}

const Markdown = ({ md: rawMD, full_name }: MarkDownProps) => {
  if (!rawMD) {
    return null
  }

  const faceLink = (f: string) => {
    return (
      '![](https://www.webfx.com/tools/emoji-cheat-sheet/graphics/emojis/' +
      f +
      '.png)'
    )
  }

  const getFixedMD = (_rawMD = '') => {
    let md = _rawMD

    const d = {
      '’': "'",
      '<br>': '\n\n',
      '<br/>': '\n\n',
      '<br />': '\n\n',
      '<em>': '',
      '</em>': '',
      '<strong>': '',
      '</strong>': '',
      '<li>': '* ',
      '</li>': '\n',
      '<ul>': '\n',
      '</ul>': '\n',
      '<code>': '`',
      '</code>': '`',
      '&nbsp;': ' ',
      '&quot;': '"',
      '&ldquo;': '"',
      '&rdquo;': '"',
      '&gt;': '>',
      '&lt;': '<'
    }
    for (const k in d) {
      const reg = new RegExp(k, 'g')
      md = md.replace(reg, d[k])
    }

    const faceRegExp = [/:([a-z_]{1,30}?):/g, /[+*-] (\[[x ]\])/g]
    faceRegExp.map(f => {
      const tmpreg = md
      while ((match = f.exec(tmpreg))) {
        if (match[1].startsWith('[')) {
          match[0] = match[1]
          if (match[1].indexOf('x') > 0) {
            match[1] = 'white_check_mark'
          } else {
            match[1] = 'white_medium_square'
          }
        }
        md = md.replace(match[0], faceLink(match[1]))
      }
    })

    const linkRegExp = /((^|[ \n:\uff1a\uff0c]+)(https?:\/\/[/0-9a-zA-Z.&=#_?-]+)([ \t\r\n]+|$))/g
    const matchCnt = 3
    let match: any
    const newHtml = md
    while ((match = linkRegExp.exec(newHtml))) {
      if (match[1] && match[matchCnt]) {
        const t = match[1]
        const url = match[matchCnt]
        const r = t.replace(url, mdLink(url, url))
        md = md.replace(match[1], r)
      }
    }
    return md
  }

  const md = getFixedMD(rawMD)

  const handleClick = (e: any) => {
    let clickurl = e.detail.currentTarget.dataset.text
    console.log('clickurl: ', clickurl)

    const isRelativeFile =
      clickurl && (clickurl.startsWith('./') || !clickurl.startsWith('http'))
    if (isRelativeFile) {
      clickurl = `${githubHttpsUrl}/${full_name}/${clickurl}`
    }

    const isGitHubUrl = isRelativeFile || isGitHubPage(clickurl)

    // TODO 跳转其他小程序
    if (isGitHubUrl) {
      const [owner, repo, filePath] = parseGitHub(clickurl)
      const path = getNavPath({ owner, repo, filePath })
      console.log('path: ', path)

      if (path) {
        Taro.navigateTo({ url: path })
      }
      return
    } else {
      copyText(clickurl)
    }
  }

  const baseUrl = full_name
    ? 'https://raw.githubusercontent.com/' + full_name + '/master/'
    : ''

  // TODO 修复 md 中含有 html 情况下的渲染
  // TODO 修复表格显示问题
  // TODO 添加 currentDir，获取正确的图片引入地址
  return (
    <View>
      <wemark
        onClick={handleClick}
        md={md}
        link
        highlight
        type='wemark'
        baseurl={baseUrl}
      />
    </View>
  )
}

export default Markdown
