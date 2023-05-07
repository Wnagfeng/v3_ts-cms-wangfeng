<template>
  <Baseechartspage :opstion="pieopstion"></Baseechartspage>
</template>
<script setup lang="ts">
import Baseechartspage from '@/Components/BaseEchartsPage/Baseechartspage.vue'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
interface iEchatrValuetype {
  value: number
  name: string
}
interface Iprops {
  pieData: iEchatrValuetype[]
}
const props = defineProps<Iprops>()
const pieopstion = computed<EChartsOption>(() => {
  return {
    title: {
      left: 'center' //设置标题居中
    },
    tooltip: {
      //提示框
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal', //图例是垂直还是水平显示
      left: 'left' //图例位置
    },
    series: [
      {
        name: '访问数据源',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          //当高亮时候的样式
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>
<style scoped lang="less"></style>
