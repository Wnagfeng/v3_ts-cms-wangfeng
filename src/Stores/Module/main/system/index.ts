import { defineStore } from 'pinia'
import { getSystemUserList } from '@/service/main/System/index'
interface Istae {
  list: IList[]
  totalCount: number
}
interface IList {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export const systemstore = defineStore('system', {
  state: (): Istae => {
    return {
      list: [],
      totalCount: 0
    }
  },
  actions: {
    async getsystemUserlistData() {
      const res = await getSystemUserList()
      this.list = res.data.list
      this.totalCount = res.data.totalCount
    }
  }
})
