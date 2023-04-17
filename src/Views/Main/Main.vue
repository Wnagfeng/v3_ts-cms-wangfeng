<template>
  <div class="MainWrapper">
    <el-container class="container">
      <el-aside width="200px" class="aside">
        <manmenu></manmenu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <mainheader></mainheader>
        </el-header>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import manmenu from './Component/main-menu/mainmenu.vue'
import mainheader from './Component/main-header/mainheader.vue'
</script>
<style scoped lang="less">
.MainWrapper {
  height: 100%;
  .container {
    height: 100%;
    .header {
      background-color: antiquewhite;
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
