# GitHubPro3
skilled hooks
2021/2/21 create,(taro+taroui+react+hooks+redux+ts+sass+eslint)
#### 2021/2/27
- hook 简单实现
**Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数**
***
- 引入redux,router
> **router 怎么使用,?**

#### 2021/2/28
- trending 静态页面
- 1 分析页面组件出问题:不知道页面组件功能和使用
- 2 taro-ui 的使用 
- useEffect 而第二个参数称之为dependencies，是一个数组，如果数组中的值变化才会触发 执行useEffect 第一个参数中的函数
- 看了2,3小时看懂了首页的trending页面
- 20:28 , 根据自己的逻辑写完首页trending页面的基本渲染(使用 hooks, 需要改进的地方还有很多)

#### 2021/3/1
- 使用taro-ui(遇到报错,因为版本问题,现在用的是3.0.0)
- 简单实现ui组件+页面逻辑,trending页面

#### 2021/3/2
- 配置笔记本环境，花了1小时（问题： 本机taro版本和小木taro版本不一致）（解决：安装tarol/cli 对应版本解决）
- 1 先实现缓存
- 2 实现选择语言
- 3 refresh 的简单实现(refresh+1时清除缓存,重新获取列表数据)
- 配置账户名发布线上

#### 2021/3/3
- eslint校验,React Hook useEffect has a missing dependency(没有解决)
- trending页面实现 language的简单实现(多用了几个taro的组件)

#### 2021/3/4
- 完成选择语言功能
- (找不到他的静态数据如何生成的: 可选择语言) 原因是:不知道useSelect 应该是taro封装的hook
- 简单使用静态数据写了完善了部分功能
- 还有的问题: redux,sass,request

#### 2021/3/5
- 总目标 : 完成myLanguage组件
- 需要构建store (看middleware 中间件)(看 redux-thunk 中间件)(看了 redux-actions)
- 看明白useSelect
- redux 引入报错(node_modules里面没有文件,不知道为啥都是空的文件夹) 删除文件夹,重新add一下(耽误了半小时吧)
- 最后没有写完这个组件(卡在了redux使用报错,无法解决: 编译不报错,生成的小程序报错 类名不能调用)

#### 2021/3/6
- 想把trending页面写完整
> 包括
> > 1 request封装 
> > 2 redux缓存机制 
> > 3 组件通信 
> > 4 最后再scass
- github API接口报错,
> ERR_PROXY_CONNECTION_FAILED, 因为本机代理问题(网络被代理)
- redux报错,store of null
> tarojs/redux => react-redux
> 疑问? hook 不需要使用 connect 
- language 组件
- request 封装
> 封装了一点

### 2021/3/7
- 写个底部导航(早上)
- 写个空组件(晚上)
> form '@/...  @ 的引入
> 单词写错耽误20分钟