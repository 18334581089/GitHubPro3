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

#### 2021/3/(8|9)
- 配置alias
- 配置自定义hook(假数据)

#### 2021/3/10
- 目标,项目 使用 promise
> 默认带有async  和  await, 不需要在引入promise包
> 把接口request规范一下
- 模仿编写简单hook

#### 2021/3/13
- news
> 发现大量使用hooks 但是不知道具体作用(先不管,除去需要登录的流程)
> 发现 useReqesetWithMore 这是获取news数据的hook
- 先写这个 hook
> > 先看useRef的具体用法
> > useRef会在每次渲染时返回同一个ref对象，即返回的ref对象在组件的整个生命周期内保持不变。自建对象每次渲染时都建立一个新的
> > > useRef 和 createRef 的区别  一个是固定的值不会响应式的改变  一个是会每次更新dom都会回去新的值(createRef 如果有异步操作,里面的数据是异步操作之前的值,并且无法更改  但是 useRef 可以写在effect里面,获取最新的)
> > > 不仅仅是用来存放dom, 还可以当作this,存放任何变量来使用 ,这点很好的解决了闭包的问题
> > > 当 useRef 的内容发生变化时,不会引起重新渲染,不会通知用户,配合effect方法可以实现比较一个参数的变化前后的值(参考useRefLean.tsx)
> > 开始写hook
> > > 补充1 useState的setState可以传递函数fn作为参数,会把上一个state作为fn的参数调用,fn的返回值是最新的state
- hook 没写
- 简单实现获取news数据,接口

#### 2021/3/18
- 底部菜单图片无法显示(没解决)
- news 页面无法正常显示(可能因为 build 和dev 同时运行的原因)
- 挑一个简单的loadMore先写了

#### 2021/3/25
- news写个下拉和上拉

#### 2021/3/26
- 理解他的useReachBottomEvent
- 和上拉一样
> 1 首先调用主方法,生成唯一id(A),监听每次下拉
> 2 首次触发下拉,把A存储在组件的唯一ref(B)里面
> 3 之后触发下拉,满足唯一A===B,就会触发effect
- news组件进行优化,下一次就是search

#### 2021/3/27
- 决定了还是写search(news和explore的组件暂时不封装)
> 先看懂逻辑

#### 2021/3/30
- 看逻辑,
- search加了切换仓库和用户,待测试

#### 2021/4/2
- search 问题1 需要判断是userList还是repoList
> 写两个数组,通过current判断
- 问题2 list值改变无法引起render
> 原因是因为curent的值没有改对
- 增加搜索记录标签

####　2021/4/3
- 想发布,得先把单个项目组件写了
- memo 是个啥
> react 顶层api(react.memo)
> > 顶层api
> > > 包括:(定义组件, 包装组件, 创建react元素,转换元素,refs,hook 等)
> > > memo 是react 顶层api 的包装组件api
> > 高阶函数
> > > `React.memo(MyComponent, areEqual)`
> > > 用来优化组件渲染: 通过判断props是否相同,相同情况下会复用最近一次渲染
> > > myComponent 是需要包装的组件
> > > areEqual 是一个对比函数,接受两个参数`(prevProps, nextProps)`
> > > 返回true/false
- 问题:　结局data传参的问题
> 传参问题,因为函数组件的第一个参数是prop
```
(
  { data }: {
    data: ITrendingRepo
  }
)
```
- 引入结构和scss
- 问题 scss 引入报错
- 问题 全局scss 引入无效(在app.tsx)
> 解决,在webpack配置文件中加入
````
sass: {
  resource: path.resolve(__dirname, '..', 'src/app.scss')
}
````

#### 2021/4/4
- 先学学样式
- 我生成的样式,为什么common和repoItem里面都有样式
> 如果我的webpack sass配置resource指向app.scss, 就会导致生成的文件样式发生重复
- css技巧
> flex布局中,子盒子使用`margin-left: auto`,可以实现margin-left最大化
> > (以后就不用把左边盒子放在一个盒子,再用space-bewteen)

#### 2021/4/7
- 想把newsItem写完,
> 看来是不可能了,因为看也没看懂目前
> 只是复制了一些简单的部分,实现了渲染
> 下次得好好改了

#### 2021/4/8
- 整理昨天逻辑
- 修复首页标题
- search加样式

#### 2021/4/21
- 整理之前逻辑
> empty,加样式