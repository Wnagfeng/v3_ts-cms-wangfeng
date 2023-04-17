import wfrequest from '../index'
import type { IAccount } from '@/Types/Login'
export function accountLogin(account: IAccount) {
  return wfrequest.post({
    url: '/login',
    data: account
  })
}
export function getUserInfo(id: number) {
  // 根据id和token去获取用户信息
  // 这里的token由于后面的请求大部分都要用到token所以我们在响应拦截器中添加token
  return wfrequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenuTree(id: number) {
  return wfrequest.get({
    url: `/role/${id}/menu`
  })
}
