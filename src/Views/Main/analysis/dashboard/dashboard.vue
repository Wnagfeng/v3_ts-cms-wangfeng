<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <template v-for="item in GoodsData">
        <countCard v-bind="item"></countCard>
      </template>
    </el-row>
  </div>
  <div class="echarts">
    <el-row :gutter="20">
      <el-col :span="8">
        <echartsCard header="分类商品数量(饼图)">
          <template #echart>
            <!-- 图表的绘制地点 -->
            <PiePage :pie-data="piedata"></PiePage>
          </template>
        </echartsCard>
      </el-col>
      <el-col :span="10">
        <echartsCard header="全国商品商品销量展示">
          <template #echart>
            <mapPage :Adddata="mapData"></mapPage>
          </template>
        </echartsCard>
      </el-col>
      <el-col :span="6">
        <echartsCard header="分类商品数量(玫瑰图)">
          <template #echart>
            <!-- 图表的绘制地点 -->
            <nightingalePage :opstion="piedata"></nightingalePage>
          </template>
        </echartsCard>
      </el-col>
    </el-row>
  </div>
  <div class="echarts2">
    <el-row :gutter="20">
      <el-col :span="12">
        <echartsCard header="分类商品的销量">
          <template #echart>
            <basicpage
              :value="roseData.Ydata"
              :name="roseData.Xdata"
            ></basicpage>
          </template>
        </echartsCard>
      </el-col>
      <el-col :span="12">
        <echartsCard header="分类商品的收藏">
          <template #echart>
            <barPage :value="barData.Ydata" :name="barData.Xdata"></barPage>
          </template>
        </echartsCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import countCard from './c-cpns/count-card/count-card.vue'
import echartsCard from './c-cpns/Echarts-card/echarts-card.vue'
import PiePage from './c-cpns/Echarts-card/c-cpns/Pie-page.vue'
import nightingalePage from './c-cpns/Echarts-card/c-cpns/nightingale-page.vue'
import basicpage from './c-cpns/Echarts-card/c-cpns/basicpage.vue'
import barPage from './c-cpns/Echarts-card/c-cpns/bar-page.vue'
import mapPage from './c-cpns/Echarts-card/c-cpns/map-page.vue'
import { usedashboardStore } from '@/Stores/Module/main/analysis/dashboard/index'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const store = usedashboardStore()
const { GoodsData, categoryData, saleData, favorData, AddressSale } =
  storeToRefs(store)
store.getgoodsdata() //发送请求获取顶部展示的数据
store.getcategorydata() //发送请求获取pie图表数据
store.getcategorysale() //发送请求获取折线图需要的数据
store.Getcategoryfavor() //发送请求获取柱形图需要的数据
store.getgoodsaddresssale() //发送请求获取地图需要的数据

// 对pie需要的数据进行格式化传递过去
const piedata = computed(() => {
  return categoryData.value.map((item: any) => {
    return { value: item.goodsCount, name: item.name }
  })
})
// 折线图的数据格式化 需要的值的格式是  Ydata goodsCount---data数字数组   Xdata name---data 字符串数组
const roseData = computed(() => {
  let Xdata: string[] = []
  let Ydata: number[] = []
  saleData.value.map((item: any) => {
    Xdata.push(item.name)
    Ydata.push(item.goodsCount)
  })
  return { Xdata, Ydata }
})

const barData = computed(() => {
  let Xdata: string[] = []
  let Ydata: number[] = []
  favorData.value.map((item: any) => {
    Xdata.push(item.name)
    Ydata.push(item.goodsFavor)
  })
  return { Xdata, Ydata }
})

const mapData = computed(() => {
  return AddressSale.value.map((item: any) => {
    return {
      name: item.address,
      value: item.count
    }
  })
})
</script>

<style scoped lang="less">
.dashboard {
}
.echarts {
  margin-top: 20px;
}
.echarts2 {
  margin-top: 20px;
}
</style>
