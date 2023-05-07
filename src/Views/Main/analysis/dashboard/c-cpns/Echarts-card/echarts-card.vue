<template>
  <el-card class="box-card" :header="header">
    <slot name="echart"></slot>
  </el-card>
</template>
<script setup lang="ts">
interface Iprops {
  header: string
}
defineProps<Iprops>()
</script>
<style scoped lang="less"></style>
