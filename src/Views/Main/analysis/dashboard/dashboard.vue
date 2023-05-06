<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <template v-for="item in GoodsData">
        <countCard v-bind="item"></countCard>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import countCard from './c-cpns/count-card/count-card.vue'
import { usedashboardStore } from '@/Stores/Module/main/analysis/dashboard/index'
import { storeToRefs } from 'pinia'
const store = usedashboardStore()
const { GoodsData } = storeToRefs(store)
store.getgoodsdata()
// 从store中取到需要展示的数据 将数据传递给子组件子组件进行展示
</script>

<style scoped>
.dashboard {
}
</style>
