<template>
  <div class="pie" ref="pieref"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
const pieref = ref()
interface Iprops {
  opstion: EChartsOption
}
const props = defineProps<Iprops>()

// 在初始化图表之前先注册一下中国地图--后面直接传入配置项直接就能展示地图
import ChinaJSON from './Data/data.json'
echarts.registerMap('china', ChinaJSON as any)

onMounted(() => {
  const chartdom = pieref.value
  const mychart = echarts.init(chartdom)

  // 当拿到新的数据从服务器拿到的数据就给我重新设置一下watchEffect自动收集依赖
  watchEffect(() => {
    mychart.setOption(props.opstion)
  })
  window.addEventListener('resize', function () {
    mychart.resize()
  })
})
</script>
<style scoped lang="less">
.pie {
  height: 300px;
}
</style>
