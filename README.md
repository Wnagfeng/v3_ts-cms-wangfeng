# 小米科技后台管理系统

###  父组件获取子组件的数据

在子组件中定义一个函数通过defineExpose进行暴露父组件通过ref获取到子组件的实例来调用函数传递数据

 关键在于在ts中父组件对于子组件的ref的类型如何确定我们可以使用(<InstanceType<typeof UserLogin>>)

对齐进行类型推导即可

### 蛋疼点

在处理记住密码逻辑的时候不能单单对于数据进行监听然后改变本地存储

```js
let isRememberPassword = ref<boolean>(
  localCache.getCache('isRememberPassword') ?? false
)
watch(isRememberPassword, (newValue) => {
  changeLocateStore(newValue)
})

// 改变本地存储的数据
function changeLocateStore(newValue: boolean) {
     localCache.removeCache('isRememberPassword')----清除字段
  localCache.setCache('isRememberPassword', newValue)
}
```

不知道为啥能监听到数据却改变不了数据暂时没找到原因

于是我在更新以后直接清除该数据字段 让他是undefined 反正他能获取到false

### 登录的逻辑

发送一个post请求携带json格式的数据 内容为name和password 让服务器进行验证 验证成功以后返回一个token 把token保存到本地 这样下次就不用在登录了 注意在发送请求后直接给我添加跳转逻辑不用担心 我们有路由守卫看着呢

```js
export function accountLogin(account: IAccount) {
  return wfrequest.post({
    url: '/login',
    data: account //携带的数据 name和password
  })
}
```

#### 添加路由守卫防止直接跳转

```js
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
})
```

只要你是去main中的 且获取的token存在 就给我跳转 否则就回去重新登录

### 巧用拦截器

根据id获取用户信息 和根据用户信息中的角色id获取用户的角色 我们在发请求的时候都需要携带指定用户的token

我们建议你在响应成功的回调拦截器中添加token 这样很方便

```js
const wfrequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 在这里给每个请求都加上一个token
      // 我们的token是放到headers中的在操作headers的时候我们最好先确保修改的数据在有值的情况下去修改
      // 如果这里不确定他是否有值就去修改请求头很容易报错
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = token
      }
      return config
    }
  }
})
export default wfrequest
```

### 小buG

从服务器拿到用户menu的列表---根据每个用户的角色不同展示不同的列表

我们不能单纯的放到store中因为页面一旦刷新我们的store就没了所以我们需要进行本地存储

注意本地存储

我在本地存储的时候没有.data 在存储到store中的时候.data了所以导致了两种数据格式不一样

当页面刷新后我的store会获取到本地存储的数据进行保存 由于没有.data 所以我需要在展示的时候进行.data

但是我的第一次渲染是有.data所以两种数据格式不一样

妈的细心吧

```
错误示例
localCache.setCache('menu', menu)
localCache.setCache('userinfo', userinfo)
  
  正确的
  localCache.setCache('menu', menu.data)
      localCache.setCache('userinfo', userinfo)
      
```

### 使用服务器返回的数据渲染menu之后我们的icon成了一个问题

如何动态获取服务器返回的icon来渲染icon图标

观察服务器返回的数据发现里面都有一个`icon:"el-icon-monitor"`

我们可以使用动态组件动态渲染标签名来实现动态渲染icon

```js
<el-icon>
  <!-- <HomeFilled />  只需要动态替换这个就行 -->
  <component :is="item.icon.split('-icon-')[1]"></component>
</el-icon>
```

### css去除滚动条逻辑--less语法

```less
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  transition: width 0.3s ease;
  &::-webkit-scrollbar {
    display: none;
  }
```

### cssDeep选中元素

现在页面中有一个根元素类名叫app

在app中有一个tste组件 该组件的根元素是div div的类名叫 wrapper

我们在app的style标签中选中 wrapper是可以选中的 但是如果我们要去选中wrapper中的子元素就选不中了

如果你在app的style中去给wrapper中的子元素设置样式你需要使用:deep(.inner){ xxxx}

当然你也可以在wrapper的style中去选中该元素

```CSS
// 为什么是global 而不是deep因为他是渲染在全局组件当中
      // 如果你渲染在全局你就给我用 ：global
      // 如果你渲染在局部你就给我用 ：deep
      :deep(.el-dropdown-menu__item) {
        color: rgb(0, 0, 0);
      }
```

### 项目重点&#x1F34F;

前端开发者为了满足所有的用户的页面的需求,在开发时候 会把所有的页面与路由映射关系全部搞定

那么如果懂点开发的就会直接手动输入路由就进去了，所以我们不能全部注册需要使用动态路由

动态路由:根据用户的权限动态的注册路由和映射关系&#x1F494;

