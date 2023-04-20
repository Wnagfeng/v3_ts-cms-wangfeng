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
    localRouters.push(module.default)
  }
  return localRouters
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
