import { defineStore } from 'pinia'
import { systemStoreMain } from './main'
import {
  getuserlist,
  deleteUser,
  createUser,
  changeuser,
  getpagelist,
  deletepagelist,
  createpagelist,
  editpagelist,
  getRoleForid
} from '@/service/main/System/index'
interface Istae {
  list: IList[]
  totalCount: number
  searchState: any
  pagelist: []
  pagetotalCount: number
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
      searchState: -1,
      pagelist: [],
      pagetotalCount: 0
    }
  },
  actions: {
    // 针对用户管理页面的请求
    async GetuserlistdataAction(info: any) {
      const res = await getuserlist(info)
      this.list = res.data.list
      this.totalCount = res.data.totalCount
      return new Promise((resolve, reject) => {
        if (res.data.totalCount == 0) {
          reject('查询失败')
        } else {
          resolve('查询成功')
        }
      })
    },
    DeleteuserlistdataAction(id: any) {
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
    },
    CreateuserlistdataAction(userinfo: any) {
      const res = createUser(userinfo)
      console.log('create')
      this.GetuserlistdataAction({ offset: 0, size: 10 })
      return res
    },
    ChangeuserlistDataAction(id: any, info: any) {
      const res = changeuser(id, info)
      this.GetuserlistdataAction({ offset: 0, size: 10 })
      return res
    },
    // 针对不同页面的请求
    async GetuserpagedataAction(pagename: string, queryInfo: any) {
      const res = await getpagelist(pagename, queryInfo)
      this.pagelist = res.data.list
      this.pagetotalCount = res.data.totalCount
    },
    DeletepagelistdataAction(pagename: string, id: any) {
      const res = deletepagelist(pagename, id).then((res) => {})
      this.GetuserpagedataAction(pagename, { offset: 0, size: 10 })
      return res
    },
    CreatepagelistdataAction(pagename: string, queryInfo: any) {
      console.log('您创建了');

      const res = createpagelist(pagename, queryInfo)
      const store = systemStoreMain()
      store.fetchAlldepartmentDataandRoleData()
      return res
    },
    ChangepagelistDataAction(pagename: string, id: any, editindo: any) {
      console.log('您编辑了',editindo);
      const res = editpagelist(pagename, id, editindo)
      const store = systemStoreMain()
      store.fetchAlldepartmentDataandRoleData()
      return res
    },
    async GetRoleDatFormId(pageName: string, id: any) {
      const res = await getRoleForid(pageName, id)
      this.pagelist = res.data
      return res
    }
  }
})
