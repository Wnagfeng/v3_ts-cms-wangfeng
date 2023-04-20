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

方案一:基于角色(Role)动态路由管理:santa:

在前端中定义一个枚举类型也可以是对象类型 保存不同角色的不同权限

```js
const roles:{
 "Root":["所有路由"] =>router.main.children
 "Admin":["一部分路由"] =>router.main.children
 "Service":["部分路由"] =>router.main.children
}
```

弊端:每增加一个角色都要添加一个key和value 

前端添加:如果已经发布了前端就不好加(必须要重新发布代码)

后端添加:这里的枚举类型 让后端给我们返回 json 根据这个json来动态添加到roles 同时后端必须要组织好json给我们前端返回



方案二:基于菜单的动态路由管理:joy:

我们在请求数据的时候我们曾经请求过一个menus 该menus是根据不同的用户角色来生成的不同的菜单

这洽洽符合我们的要求  我们只需要把这些菜单给动态映射出来刚好就是我们的路由了

#### 第一步

对于动态路由的文件架构思想以及自动化生成文件结构

对于路由 最好是view中的页面与router中的页面成一一对应关系

这里我们使用coderwhy的自动生成文件夹结构 

第一步安装  npm install coderwhy -g

理一下思路我们的view和router是一一对应的我们使用该工具只需要在main页面中生成view他就会自动在router文件夹下生成 对应的路由文件 比如生成一下结构

coderwhy add3page_setup list -d src/views/main/story/list

main下的文件内容

```js
<template>
  <div class="list">
    <h2>list</h2>
  </div>
</template>

<script setup lang="ts" name="list"></script>

<style scoped>
.list {
}
</style>

```

router下的问价内容

```js
const list = () => import('@/views/main/story/list/list.vue')
export default {
  path: '/main/story/list',
  name: 'list',
  component: list,
  children: []
}
```

可以看到我们的router下的文件中会自动给我们引入了main下的页面

且生成了path 这个path刚好是我们的路由

#### 第二步

我们想要实现动态路由就需要在用户登录的一瞬间拿到该用户所有的权限 根据他的权限去动态添加路由

前面我们已经通过token拿到了用户的menus列表在menus中有许多的路由 这些路由刚好是该用户应该拥有的

我们需要取出来

##### 2.1获取所有的路由我们通过自动化生成了所有的页面我们需要全部拿到放到数组中

这里我们使用vite中的 import.meta.glob 

定义路径模式之后，可以调用 `import.meta.glob` 方法来导入匹配到的模块。该方法返回一个对象，其中每个键都是匹配到的模块路径，每个值都是一个异步加载函数，用于动态导入对应的模块。

```js
// 动态添加路由
      // 我们已经生成页面中所有的文件结构和路由结构，接下来我们需要拿到所有的路由从router下的文件中拿
      // 匹配某个文件夹及其子文件夹下的所有 .vue 文件：./path/**/*.vue

      // 第一步定义一个用于保存所有路由的数组
      const localRouters: RouteRecordRaw[] = []
      const files: Record<string, any> = import.meta.glob(
        '../../../router/main/**/*.ts',
        {
          /*
       在某些情况下，可能需要在应用加载时就预先加载所有匹配到的模块，以便加快应用的启动速度。为了实现这个目的，可以在路径模式后面加上 {eager: true}，来表示对所有匹配到的模块进行“急切导入（eager import）”。
        */
          eager: true
        }
      )
      // 第二步把main页面中的所有路由添加到localRouters中进行存储
      for (const key in files) {
        const module = files[key]
        // 把该路由对象放到数组中
        localRouters.push(module.default)
        // 现在在localRouters数组中存储了main页面中的所有路由
      }
      //第三步根据usermenus去匹配需要的路由进行添加到路由中
      for (const menu of menuRes) {
        // 拿到他的全部路由
        for (const submenu of menu.children) {
          const route = localRouters.find((item) => item.path === submenu.url)
          if (route) router.addRoute('main', route)
        }
      }
```

### 修复bug

当用户从登录页面进入以后是可以匹配路由的

当用户在main页面 中刷新一下以后就不行了 我们需要对齐进行修复一下

在vue中只要你进行刷新就会进行使用pinia 我们刚好可以在main中搞一下

解决方案我们在loginStore中的action中在定义一个函数用于重新加载routers去重新匹配路由

```js
 // 只要用户给我刷新我就给他重新加载一下所有的路由
    loadRouters() {
      const rouers = mapMenusToRouters(this.usermenu)
      rouers.forEach((item) => {
        router.addRoute('main', item)
      })
    }
```

在main中的使用pinia之后在使用router之前我们进行调用该函数进行调用重新匹配路由

因为我们需要先进行用户权限的路由匹配和添加之后在使用路由所以我们最好在使用路由之前进行调用该函数

### 项目细节

建议在用户登录成功以后把main页面跳转到用户menus中的第一个url

```js
if (fristRouterUrl === null && route) {
        fristRouterUrl = submenu
      }
```

直接把这个东西暴露出去再次在路由守卫中拦截一下就行
