import wfrequest from '@/service'

export function getSystemUserList() {
  return wfrequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10,
    }
  })
}
