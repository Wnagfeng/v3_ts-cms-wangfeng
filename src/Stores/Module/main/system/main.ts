import { defineStore } from 'pinia'
import { getdepartmentlist, getrolelist } from '@/service/main/System/main'

interface ImainSysTemState {
  entireRoles: any[]
  entireDepartments: any[]
}
export const systemStoreMain = defineStore('systemStore', {
  state: (): ImainSysTemState => {
    return {
      entireRoles: [],
      entireDepartments: []
    }
  },
  actions: {
    async fetchAlldepartmentDataandRoleData() {
      const departmentlist = await getdepartmentlist()
      const rolelist = await getrolelist()

      console.log(departmentlist)
      console.log(rolelist)
    }
  }
})