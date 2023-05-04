import { defineStore } from 'pinia'
import {
  accountLogin,
  getUserInfo,
  getUserMenuTree
} from '@/service/login/login'
import type { IAccount } from '@/Types/Login'
import { localCache } from '@/Utils/Cache.js'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRouters, mapUsermenutoPermissions } from '@/Utils/map-menus'
import { systemStoreMain } from '../main/system/main'

import router from '@/router'

// 确定state类型
interface Istate {
  token: string
  userinfo: any
  usermenu: any
  Permission: any
}
// 确定state的类型实际上就是确定箭头函数的返回值类型直接:xx类型就行
const useLoginStore = defineStore('login', {
  state: (): Istate => {
    return {
      token: localStorage.getItem(LOGIN_TOKEN) ?? '',
      userinfo: localCache.getCache('userinfo') ?? {},
      usermenu: localCache.getCache('menu') ?? [],
      Permission: []
    }
  },
  actions: {
    // 让他接收一个account对象 在这里发送网络请求
    async loginAccountAction(account: IAccount) {
      // 1更据name和password去发送网络请求获取数据
      const res = await accountLogin(account)
      const id = res.data.id
      this.token = res.data.token
      localCache.setCache(LOGIN_TOKEN, res.data.token)

      // 3根据token和用户id去获取用户信息
      const userinfo = await getUserInfo(id)
      const userinfoRes = userinfo.data
      this.userinfo = userinfoRes

      // 4根据登录用户token请求用户权限菜单树
      const menu = await getUserMenuTree(this.userinfo.role.id)
      const menuRes = menu.data
      this.usermenu = menuRes

      // 5.根据用户的权限列表去获取该用户的权限
      const permission = mapUsermenutoPermissions(this.usermenu)
      this.Permission = [...permission]

      localCache.setCache('menu', menu.data)
      localCache.setCache('userinfo', userinfo)

      // 请求用户角色列表和菜单列表
      const systemMainstore = systemStoreMain()
      systemMainstore.fetchAlldepartmentDataandRoleData()

      // 动态添加路由---看redme.md有详解
      const rouers = mapMenusToRouters(menuRes)
      rouers.forEach((item) => {
        router.addRoute('main', item)
      })

      router.push('/main')
    },
    // 只要用户给我刷新我就给他重新加载一下所有的路由
    // 在main页面中使用一下该函数就行
    loadRouters() {
      const rouers = mapMenusToRouters(this.usermenu)
      // 用户刷新在获取一次角色列表
      const systemMainstore = systemStoreMain()
      systemMainstore.fetchAlldepartmentDataandRoleData()
      rouers.forEach((item) => {
        router.addRoute('main', item)
      })

      // 只要用户刷新了我们就给他重新map一次该用户的权限
      const permission = mapUsermenutoPermissions(this.usermenu)
      this.Permission = [...permission]
    }
  }
})

export default useLoginStore
