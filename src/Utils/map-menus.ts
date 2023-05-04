import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'

function loadLocalRouters() {
  const localRouters: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }
  )
  for (const key in files) {
    const module = files[key]
    // 取到每一个模块
    // 把模块中的defaultpush进去
    localRouters.push(module.default)
  }
  return localRouters // router下的所有路由文件中的内容也就是我们需要的路由模块
}

// 获取到该用户的第一个路由权限在第一次进入页面以后我们进行跳转到第一个页面
export let fristRouterUrl: any = null
export function mapMenusToRouters(usermenu: any) {
  const localRouters = loadLocalRouters()
  const rouers: RouteRecordRaw[] = []

  for (const menu of usermenu) {
    for (const submenu of menu.children) {
      const route = localRouters.find((item) => item.path === submenu.url)
      if (route) {
        // 我们这里的重定向匹配只需要添加一次就行 只需要判断一下当前的一级路由是否已经添加过了如果添加过了 就不用在添加了

        //  日你妈还不懂画个图去--简单的一批
        if (!rouers.find((item) => item.path === menu.url)) {
          rouers.push({ path: menu.url, redirect: route.path })
        }
        rouers.push(route)
      }
      if (fristRouterUrl === null && route) {
        fristRouterUrl = submenu
      }
    }
  }
  // 把需要添加的路由返回出去

  return rouers
}

export function mapPathtoUsermenus(path: any, usermenu: any) {
  for (const menu of usermenu) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu.id
      }
    }
  }
}

interface IBreadcrumb {
  name: any
  path: any
}
// 封装一个函数用户匹配面包屑
// 需求根据当前路由去匹配父级路由的name同时也要展示当前路由的name
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

// 根据用户的权限列表获取用户的权限
export function mapUsermenutoPermissions(usermenu: any[]) {
  // 创建一个用于保存用户权限的数组
  let Permissions: any = []
  // 写一个闭包来解析该用户的权限
  function mapPermissions(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        mapPermissions(item.children)
      } else {
        if (item.permission) {
          Permissions.push(item.permission)
        }
      }
    }
  }
  mapPermissions(usermenu)
  return Permissions
}
