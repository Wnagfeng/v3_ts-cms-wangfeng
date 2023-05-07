<template>
  <Baseechartspage :opstion="baroption"></Baseechartspage>
</template>
<script setup lang="ts">
import Baseechartspage from '@/Components/BaseEchartsPage/Baseechartspage.vue'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { computed } from 'vue'

interface Iprops {
  value: number[]
  name: string[]
}
const props = defineProps<Iprops>()
const baroption = computed<EChartsOption>(() => {
  return {
    xAxis: {
      type: 'category',
      data: props.name,

      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.value,
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        }
      }
    ]
  }
})
</script>
<style scoped lang="less"></style>
