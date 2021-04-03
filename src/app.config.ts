export default {
  pages: [
    'pages/trending/trending',
    'pages/search/search',
    'pages/news/news',
    'pages/language/language',
    'pages/index/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/trending/trending',
        iconPath: 'assets/icons/trending.png',
        selectedIconPath: 'assets/icons/trending_active.png',
        text: 'Trending'
      },
      {
        pagePath: 'pages/news/news',
        iconPath: 'assets/icons/news.png',
        selectedIconPath: 'assets/icons/news_active.png',
        text: 'News'
      },
      {
        pagePath: 'pages/search/search',
        iconPath: 'assets/icons/search.png',
        selectedIconPath: 'assets/icons/search_active.png',
        text: 'Search'
      }
    ]
  }
}
