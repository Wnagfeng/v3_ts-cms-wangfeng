<template>
  <div class="App">
    <el-config-provider :locale="locale">
      <RouterView></RouterView>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = zhCn
</script>
<style scoped lang="less">
.App {
  width: 100%;
  height: 100%;
}
</style>
