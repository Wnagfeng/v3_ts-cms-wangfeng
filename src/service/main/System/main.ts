import wfrequest from '@/service'
export function getdepartmentlist() {
  return wfrequest.post({
    url: '/department/list'
  })
}

export function getrolelist() {
  return wfrequest.post({
    url: '/role/list'
  })
}
