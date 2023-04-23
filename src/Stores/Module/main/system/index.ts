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
      return new Promise((resolve, reject) => {
        if(res.data.totalCount==0){
          reject("查询失败")
        }else{
          resolve("查询成功")
        }
      })
    },
    StoredelteUser(id: any) {
      const res = deleteUser(id).then((res) => {
        console.log(res.code)
        if (res.code == -1002) {
          ElMessage.error('删除用户失败,您的权限不够')
        } else {
          ElMessage({
            message: '删除用户成功',
            type: 'success'
          })
        }
      })
      return res
    }
  }
})
