import { defineStore } from 'pinia'
import { getSystemUserList, deleteUser } from '@/service/main/System/index'
interface Istae {
  list: IList[]
  totalCount: number
  searchState: any
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
      totalCount: 0,
      searchState: -1
    }
  },
  actions: {
    async getsystemUserlistData(info: any) {
      const res = await getSystemUserList(info)
      this.list = res.data.list
      this.totalCount = res.data.totalCount
    },
    StoredelteUser(id: any) {
      const res = deleteUser(id)
      return res
    }
  }
})
