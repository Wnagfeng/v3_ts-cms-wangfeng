import { defineStore } from 'pinia'
import { GetgoodsData } from '@/service/main/analysis/dashboard'
export const usedashboardStore = defineStore('dashboard', {
  state: () => {
    return {
      GoodsData: []
    }
  },
  actions: {
    async getgoodsdata() {
      const res = await GetgoodsData()
      this.GoodsData = res.data
    }
  }
})
