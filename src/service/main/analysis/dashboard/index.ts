import wfrequest from '@/service'

export function GetgoodsData() {
  return wfrequest.get({
    url: '/goods/amount/list'
  })
}

export function GetcategoryAllData() {
  return wfrequest.get({
    url: '/goods/category/count'
  })
}

export function Getcategorysale() {
  return wfrequest.get({
    url: '/goods/category/sale'
  })
}

export function Getcategoryfavor() {
  return wfrequest.get({
    url: '/goods/category/favor'
  })
}
export function getGoodsAddressSale() {
  return wfrequest.get({
    url: '/goods/address/sale'
  })
}
