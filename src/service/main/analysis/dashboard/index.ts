import wfrequest from '@/service'

export function GetgoodsData() {
  return wfrequest.get({
    url: '/goods/amount/list'
  })
}
