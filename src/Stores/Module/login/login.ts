import { defineStore } from 'pinia'
import {
  accountLogin,
  getUserInfo,
  getUserMenuTree
} from '@/service/login/login'
import type { IAccount } from '@/Types/Login'
import { localCache } from '@/Utils/Cache.js'
import { LOGIN_TOKEN } from '@/global/constants'

import router from '@/Router'
// 确定state类型
interface Istate {
  token: string
  userinfo: any
  usermenu: any
}
// 确定state的类型实际上就是确定箭头函数的返回值类型直接:xx类型就行
const useLoginStore = defineStore('login', {
  state: (): Istate => {
    return {
      token: localStorage.getItem(LOGIN_TOKEN) ?? '',
      userinfo: {},
      usermenu: []
    }
  },
  actions: {
    // 让他接收一个account对象 在这里发送网络请求
    async loginAccountAction(account: IAccount) {
      // 1更据name和password去发送网络请求获取数据
      const res = await accountLogin(account)
      const id = res.data.id
      this.token = res.data.token
      const name = res.data.name
      // 2进行本地存储
      localCache.setCache(LOGIN_TOKEN, res.data.token)
      // 3根据token和用户id去获取用户信息
      const userinfo = await getUserInfo(id)
      this.userinfo = userinfo.data
      // 4根据角色请求用户权限菜单树
      const menu = await getUserMenuTree(this.userinfo.role.id)
      this.usermenu = menu.data

      router.push('/main')
    }
  }
})

export default useLoginStore
