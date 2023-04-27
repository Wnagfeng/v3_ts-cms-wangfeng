import wfrequest from '@/service'

/* 针对用户管理的网络请求 */
export function getuserlist(info: any) {
  return wfrequest.post({
    url: '/users/list',
    data: info
  })
}

export function deleteUser(id: any) {
  return wfrequest.delete({
    url: `/users/${id}`
  })
}

export function createUser(userinfo: any) {
  return wfrequest.post({
    url: '/users',
    data: userinfo
  })
}

export function changeuser(id: any, info: any) {
  return wfrequest.patch({
    url: `/users/${id}`,
    data: info
  })
}

/** 针对页面的数据: 增删改查 */
export function getpagelist(pagename: string, queryInfo: any) {
  return wfrequest.post({
    url: `/${pagename}/list`,
    data: queryInfo
  })
}
export function deletepagelist(pagename: string, id: any) {
  return wfrequest.delete({
    url: `/${pagename}/${id}`
  })
}
export function createpagelist(pagename: string, queryInfo: any) {
  return wfrequest.post({
    url: `/${pagename}`,
    data: queryInfo
  })
}
export function editpagelist(pagename: string, id: any, editindo: any) {
  return wfrequest.patch({
    url: `/${pagename}/${id}`,
    data: editindo
  })
}
// role的查询逻辑
export function getRoleForid(pagename: string, id: any) {
  return wfrequest.get({
    url: `/${pagename}/${id}`
  })
}
