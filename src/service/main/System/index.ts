import wfrequest from '@/service'

export function getSystemUserList(info: any) {
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

