<template>
  <div class="MainWrapper">
    <el-container class="container">
      <el-aside class="aside" :width="flage ? '60px' : '200px'">
        <mainmenu :isFold="!flage"> </mainmenu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <mainheader @changeFold="handleFold"></mainheader>
        </el-header>
        <el-main class="main">
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import mainmenu from '@/views/main/Component/main-menu/mainmenu.vue'
import mainheader from '@/views/main/Component/main-header/mainheader.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
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
    background-color: #f0f2f5;
  }
}
</style>
