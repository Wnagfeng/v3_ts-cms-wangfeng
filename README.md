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

理一下思路我们的view和router是一一对应的我们使用该工具只需要在main页面中生成view他就会自动在router文件夹下生成 对应的路由文件 比如生成以下结构

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

### 根据url去匹配menu的位置

```js
export function mapPathtoUsermenus(path: any, usermenu: any) {
  for (const menu of usermenu) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu.id
      }
    }
  }
}
```

只需要匹配到usermenu中的位置即可拿到我们需要的id

### 今天需要对面包屑进行封装

面包屑需求:

第一个菜单显示当前路由的父路由name 

后面的菜单以此类推,要求点击第一个面包屑跳转到当前的路由组中的第一个路由(由于我们没有对父路由进行匹配页面)

我们需要封装一些redirect去跳转路由

在编写完主要逻辑之后，需要注意 在页面调用该函数的时候他不是响应式的数据所以在用户点击其他的menu的时候不能直接响应改变页面

我们需要使用vue中的computed进行数据监听

主要的逻辑

```js
export function mapPathToBreadcrumbName(path: any, usermenu: any) {
  // 用户传递过来当个路由和全部路由
  const Breadcrumb: IBreadcrumb[] = []
  for (const menu of usermenu) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        Breadcrumb.push({ name: menu.name, path: menu.url })
        Breadcrumb.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return Breadcrumb
}
```

页面逻辑

```js
const Breadcrumb = computed(() => {
  return mapPathToBreadcrumbName(route.path, usermenu)
})
```

第一:所有你匹配到的路由不能直接返回要存数组，因为后期要遍历该数据

第二:在使用computed进行监听的时候是监听该函数不是监听其他数据 函数的改变主要是参数的变化

route.path就是变量所以在每次发生改变后都要获取当前路由而不是你直接获取传递过来是在调用函数时获取该数据

### 点击不同页码展示不同的数据

```js
function fetchUserlistData() {
  // size你每次请求需要拿多少数
  const size = pageSize.value //根据当前页面需要展示多少数据去请求数据
  const offset = (currentPage.value - 1) * size
  const info = {
    size,
    offset
  }
  store.getsystemUserlistData(info)
}
```

pageSize的初始值为10

currentPage初始值为1

这两个值是绑定的当我们需要切换页码和一页的数量就会改变这两值

所以这两个值可以当做我们的请求数据的依据

分析:

第一次请求 --pageSize=10 currentPage=1

也就是第一次请求为请求数据量10条 请求偏移量为0  一共拿10条数据

当我们点击下一页的时候size为10--- currentPage为2 offset也就是偏移10条数据请求10条数据也就是后面的数据

当我们点击一页展示多少数据的时候就是 改变size 当size为20时候 offset还是10 但是请求数据量变大了也就是一次请求20条数据 展示20条数据

### 对于请求的管理

由于我们的角色列表和部门列表在其他的页面中很有可能也会被用到所以这里我们把这两个请求单独封装到service中的system中的main中进行单独的请求同时store中也是创建一个单独的文件单独的保存数据

这两个数据的请求位置最好在登录成功之后就去拿到数据提前做好准备

### 修改用户的info的逻辑BUg

今天在修改用户信息的时候出现了问题

简单复盘一下

修改用户信息需要发送网络请求 根据用户的id和携带的fromdata去修改数据

当我们点击编辑按钮的时候通过作用域插槽获取到点击的用户的数据

```js
@click=EditUserData(scope.row)

function EditUserData(EditData: any) {
  // 当点击这个事件的时候我们需要派发一个事件让外界知道我们点击了他
  // 当点击这个事件以后我们把点击的数据传递出去用它来作为编辑的数据
  emit('EditUser', EditData)
} 
把拿到的点击的数据派发出去
```

在user页面中监听EditUser的点击并且获取数据

```ts
// 当用户点击编辑的逻辑
function handlEditUserData(EditData: any) {
  // 不是创建传递一个false
  userdialog.value.changecenterDialogVisible(false, EditData)
}
```

dialog页面

````js
function changecenterDialogVisible(iscreate: boolean, EditData?: any) {
  // 当点击编辑以后我们把点击的数据对象拿过来 但是他不是必选的
  centerDialogVisible.value = true
  isCreate.value = iscreate
  // 如果是编辑数据我们就把该数据填充到formData中方便我们进行可视化编辑
  // 这个替换的操作只有在编辑的时候才能替换新建的操作必须是用户自己输入自己创建
  if (isCreate.value == false) {
    for (const key in formData) {
      // 根据formdata中的key去取到EditData中的value去替换formdata中的数据这样就能展示了
      formData[key] = EditData[key]
    }
    changeuseroinfoData.value = EditData
  } else {
    // 当用户不是编辑操作的时候我们就把数据设置为空
    for (const key in formData) {
      formData[key] = ''
    }
  }
}
````

我们在这里对数据进行展示方便用户进行动态改变

但是我们需要注意的时候我们修改的用户的信息的id是在EditData中的id所以我们需要把它保存一下

```js
// 创建一个用于保存修改信息的对象
const changeuseroinfoData = ref()
```

在发请求的时候第一个参数的id是从EditData中的id拿到的也就是从changeuseroinfoData.value.id 我

他妈直接来个formData.roleId老是修改不成功 妈的原来如此

## 上难度

### 对组件进行高度封装

需要实现的效果，我们所有的页面配置基本都是一样的增删改查 ，在我们对组件进行抽取以后我们只需要通过一个配置文件生成页面即可

首先我们如果想实现动态配置页面我们就需要实现动态的请求数据

#### 一对网络请求的动态封装

观察后端给我们的网络请求不难发现

获取用户列表/user/list

获取部门列表/department/list

所以我们只需要对网络请求的前一个字段进行动态获取即可实现动态请求网络数据

```js
/** 针对页面的数据: 增删改查 */
export function getpagelist(pagename: string, queryInfo: any) {
  return wfrequest.post({
    url: `/${pagename}/list`,
    data: queryInfo
  })
}
export function deletepagelist(pagename: string, id: any) {
  return wfrequest.delete({
    url: `/${pagename}/${id}`
  })
}
export function createpagelist(pagename: string, queryInfo: any) {
  return wfrequest.post({
    url: `/${pagename}`,
    data: queryInfo
  })
}
export function editpagelist(pagename: string, id: any, editindo: any) {
  return wfrequest.patch({
    url: `/${pagename}/${id}`,
    data: editindo
  })
}
```

在页面中就是改改标题换一下网络请求就行

### vue3+ts中的props定义方式

```ts
//第一步定一个类型
interface IProps {
  searchConfig: {
    pageName: string
    labelWidth?: string
    formItems: any[]
  }
}
//第二步定义一个props
const props = defineProps<IProps>()
//第三步食用
```

### 编写组件代码注意事项

在一个页面中有三个组件我们需要借助主页面进行跳板 比如在子组件中点击搜索按钮在父组中监听搜索按钮的点击

并且把携带的数据发出去在父组件中进行调用子组件实例调用发送请求的实例携带数据也带过去进行发请求

所以在跳板当中你最好不要有请求的发送 最好所有的请求都在子组件中发送

### 高度定制化:warning:

我们在表格中展示数据的时候不一定总是展示一个文本有可能展示的img或者其他东西所以我们在配置文件中把type命名为type: 'custom',表示对于这条数据我们需要自定义展示

```json
{
      type: 'custom',
      label: '部门领导',
      prop: 'leader',
      width: '150px',
      slotName: 'leader'
    },
    {
      type: 'custom',
      label: '上级部门',
      prop: 'parentId',
      width: '150px',
      slotName: 'parent'
    }
```

那么在组件中我们用一个判断只要type等于 'custom'我们就根据配置文件中的slotName留一个具名插槽

```vue
  <template v-else-if="item.type == 'custom'">
    <!-- 实现插槽 -->
    <el-table-column align="center" v-bind="item">
      <!-- 在这里留下一个具名插槽让开发者传递进来 name由数据传递进来 -->
      <!-- 这里是el-table-column给我们预留的插槽 -->
      <template #default="scope">//这里是elementui给我们留的一个默认的插槽
          //我们在默认插槽中在留下一个插槽在外面展示的时候你给我传进来展示
        <slot
          :name="item.slotName"
          v-bind="scope"//这句话的意思是把elementui传递给我们的数据在传递到我们自己的预留插槽上
          :prop="item.prop"//注意所有的只要是你在slot上绑定的属性他都会给你收集到一起传递出去
          :slotdata="item"
        ></slot>
      </template>
      <!-- 这里在组件的使用中传递够来 -->
    </el-table-column>
  </template>
```

页面中的插入位置展示

```vue
   <pagecount
        :department-coun-config="departmentCounConfig"
        @create-user="handlcreatepage"
        @edit-user="handlEdit"
      >
        <!-- 这里的具名也要让他给我传递过来 -->
        <template #leader="scope">//这里就是你留下的具名插槽插入位置
          //注意scope会自动收集你在solt上绑定的所有的数据
          <span class="leader">哈哈哈: {{ scope.row[scope.prop] }}</span>
        </template>
        <template #parent="scope">//这里就是你留下的具名插槽插入位置
          <span class="parent">呵呵呵: {{ scope.row[scope.prop] }}</span>
        </template>
      </pagecount>
```

### 细节

在做部门管理页面中的新建部门时候我们很容易就能把配置文件搞出来但是上级部门的数据怎么搞呢 我们在配置文件里不好搞，所以我们哟啊使用数据劫持进行二次填充数据

````ts
// 对配置文件数据进行劫持获取全部部门数据给他塞进去
const departmentDialogdata = computed(() => {
  // 拿到全部部门的数据--这里的数据是name和id我们需要的是lable和value
  const alldepartementData = systemSstore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  //departmentDialogConfig是我们的配置数据 把他改一下再传递出去就行
  departmentDialogConfig.propsList.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.opstion?.push(...alldepartementData)
    }
  })
  return departmentDialogConfig
})
````



### 细节二

在做部门管理页面中的新建部门时候我们我们如果想对数据进行填充默认值我们不仅要在配置文件中写上默认值还要对默认值进行处理 因为他一上来是不展示的所以你如果想填充数据你必须在这里搞定

```ts
interface IProps {
  departmentDialogConfig: {
    createtitle: string
    edittitle: string
    pagename: string
    propsList: any[]
  }
}
const props = defineProps<IProps>()
const inittialForm: any = {}
for (const item of props.departmentDialogConfig.propsList) {
  // 如果你想做默认值你需要在这里搞 因为他这个东西一上来不展示

  /*
  默认值的逻辑----------------------这里这里----------------------------
  for (const key in formData) {
    const item = props.modalConfig.formItems.find((item) => item.prop === key)
    formData[key] = item ? item.initialValue : ''
  }
   */
  inittialForm[item.prop] = ''
}
// 保存输入的地方
const formInfo = reactive(inittialForm)
```

### 细节三

在做菜单管理界面的中间部分的时候发现我们需要展示子菜单子菜单需要有一个tree类型列表

如果你想做这种效果不可缺少的属性是``row-key="id"	``

需要展示的数据一般是在chliden中我们需要写上这个属性

```elixir
:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
```

children表示你的数据源在哪里 比如在list中就改成list 

hasChildren是否有children列表 这些如果默认不添加都是默认添加上的

在定义数据的时候如果确定这个数据的需要有children展示的就不要写type='normal'了因为他会覆盖element样式建议不要乱添加type 换个字段名去判断

### 创建角色时候的细节

当用户为创建的角色选择用户权限的时候我们传递的一串id过去 

编辑角色的细节 

当用户点击编辑用户的时候我们需要对数据进行回显 该角色有哪些权限就展示哪些权限

我们需要定义一个函数用来获取数据中的所有id--一级就不要了因为他一旦设置上了就是全选了自己测试一下

```ts
// 获取id的逻辑
function mapmenulisttoIds(menuList: any[]) {
  const idS: number[] = []
  function mapidtoids(menus: any[]) {
    for (const item of menus) {
      // 如果当前的这段数据中有children就在调用一次这个函数
      if (item.children) {
        mapidtoids(item.children)
      } else {
        // 如果不存在就给我添加
        idS.push(item.id)
      }
    }
  }
  mapidtoids(menuList)
  return idS
}
```

设置的话我们必须在nexttick中设置

```vue
 nextTick(() => {
    treeRef?.value?.setCheckedKeys(res)
 })
```

为什么？ :wheel_of_dharma:

nextTick--->当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。

所以我们这设置选中后他是不会立即更新的 所以你暂时拿不到 所以我们需要在下一次dom更新完成之后拿到所有的数据

原因因为我们在点击编辑按钮以后第一个操作是弹出编辑框 编辑框的展示或者不展示是由一个响应式对象决定的

所以他会触发更新的机制 不会立即更新所以你设置上去没有效果

nextTick 的回调是宏任务还是微任务呢?

在v2中发生了很多次变化

在v3中他是一个微任务!

他的原理是 把你给nextTick的函数全部加到更新队列的promise.then中

then是一个微任务 只要promise中的代码执行完毕就会执行then中的代码 

vue把所有的更新都放到一个promise中更新函数放到这个promise中的then中
