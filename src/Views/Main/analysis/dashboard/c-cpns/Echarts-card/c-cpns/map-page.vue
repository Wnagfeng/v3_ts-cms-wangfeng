<template>
  <Baseechartspage :opstion="mappoption"></Baseechartspage>
</template>
<script setup lang="ts">
import Baseechartspage from '@/Components/BaseEchartsPage/Baseechartspage.vue'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import * as echarts from 'echarts'
import { convertData } from './utils/convert-data'
interface Iprops {
  value: number
  name: string
}
interface addressdata {
  Adddata: Iprops[]
}
const props = defineProps<addressdata>()
const mappoption = computed<EChartsOption>(() => {
  return {
    backgroundColor: '#fff',
    title: {
      text: '全国销量统计',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
      }
    },
    visualMap: {
      // 视觉展示
      min: 0, //指定 visualMapContinuous 组件的允许的最值
      max: 60000,
      left: 0,
      bottom: 20,
      calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: 'black'
      }
    },
    geo: {
      // 设置使用的地图(注册过的china地址)
      map: 'china',
      // 漫步: 支持鼠标缩放效果
      roam: 'scale',
      emphasis: {
        areaColor: '#f4cccc',
        borderColor: 'rgb(9, 54, 95)',
        itemStyle: {
          areaColor: '#f4cccc'
        }
      }
    },
    series: [
      {
        map: 'china',
        name: '销量',
        // 散点图在地图上展示数据
        type: 'scatter',
        coordinateSystem: 'geo',
        // 数据的展示是根据城市的经纬度 来展示数据的 所以我们需要对数据进行格式化
        data: convertData(props.Adddata), //根据经纬度展示点位
        // 散点的大小(可以根据数据不同显示不同的大小, 设置为一个函数)
        symbolSize: 12,
        // 高亮的样式
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        // 这个是地图 在这里我们可以直接填充数据但是你需要把鼠标放上去才能展示
        // 会自动生成geo地理坐标系统
        type: 'map',
        // 设置使用的地图名称, 复用的是第0个坐标系统
        map: 'china',
        geoIndex: 0,
        // 当前视角的缩放比例（地图的放大比例）
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
  }
})
</script>
<style scoped lang="less"></style>
