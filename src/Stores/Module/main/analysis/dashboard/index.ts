import { defineStore } from 'pinia'
import {
  GetgoodsData,
  GetcategoryAllData,
  Getcategorysale,
  Getcategoryfavor,
  getGoodsAddressSale
} from '@/service/main/analysis/dashboard'
export const usedashboardStore = defineStore('dashboard', {
  state: () => {
    return {
      GoodsData: [],
      categoryData: [],
      saleData: [],
      favorData: [],
      AddressSale: []
    }
  },
  actions: {
    getgoodsdata() {
      GetgoodsData().then((res) => {
        this.GoodsData = res.data
      })
    },

    getcategorydata() {
      GetcategoryAllData().then((res) => {
        this.categoryData = res.data
      })
    },
    getcategorysale() {
      Getcategorysale().then((res) => {
        this.saleData = res.data
      })
    },
    Getcategoryfavor() {
      Getcategoryfavor().then((res) => {
        this.favorData = res.data
      })
    },
    getgoodsaddresssale() {
      getGoodsAddressSale().then((res) => {
        this.AddressSale = res.data
      })
    }
  }
})
