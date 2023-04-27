import { defineStore } from 'pinia'
import {
  getdepartmentlist,
  getrolelist,
  getmenulist
} from '@/service/main/System/main'
interface ImainSysTemState {
  entireRoles: any[]
  entireDepartments: any[]
  entireAllMenulist: any[]
}
export const systemStoreMain = defineStore('systemStore', {
  state: (): ImainSysTemState => {
    return {
      entireRoles: [],
      entireDepartments: [],
      entireAllMenulist: []
    }
  },
  actions: {
    async fetchAlldepartmentDataandRoleData() {
      const departmentlist = await getdepartmentlist()
      const rolelist = await getrolelist()
      this.entireRoles = rolelist.data.list
      this.entireDepartments = departmentlist.data.list
    },

    async fetchgetAllmenulist() {
      const res = await getmenulist()
      this.entireAllMenulist = res?.data?.list
    }
  }
})
