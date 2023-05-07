<template>
  <Baseechartspage :opstion="nightingaleoption"></Baseechartspage>
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
  opstion: iEchatrValuetype[]
}
const props = defineProps<Iprops>()
const nightingaleoption = computed<EChartsOption>(() => {
  return {
    tooltip: {
      //提示框
      trigger: 'item'
    },
    // 展示工具的配置
    toolbox: {
      //导出工具
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        // 内半径和外半径的大小
        radius: [15, 120],
        center: ['50%', '50%'],
        // 圆心角一样, 通过半径的不同表示大小
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        // 表示不展示label
        label: {
          show: false
        },
        data: props.opstion
      }
    ]
  }
})
</script>
<style scoped lang="less"></style>
