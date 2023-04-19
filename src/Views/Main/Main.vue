<template>
  <div class="MainWrapper">
    <el-container class="container">
      <el-aside class="aside" :width="flage ? '60px' : '200px'">
        <manmenu :isFold="!flage"></manmenu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <mainheader @changeFold="handleFold"></mainheader>
        </el-header>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import manmenu from './Component/main-menu/mainmenu.vue'
import mainheader from './Component/main-header/mainheader.vue'
import { ref } from 'vue'
const flage = ref(false)
function handleFold(flageFlod: boolean) {
  flage.value = flageFlod
}
</script>
<style scoped lang="less">
.MainWrapper {
  height: 100%;

  .container {
    height: 100%;
    .aside {
      transition: all 0.3s ease;
    }
    .header {
      height: 50px;
    }
  }

  .aside {
    background-color: aqua;
  }

  .main {
    background-color: skyblue;
  }
}
</style>
