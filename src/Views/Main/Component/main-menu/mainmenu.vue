<template>
  <div class="main-menu-wrapper">
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="" />
      <h1 class="title" v-show="isFold">小米人事管理系统</h1>
    </div>
    <el-menu
      :collapse="!isFold"
      default-active="2"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
    >
      <template v-for="item in usermenu" :key="item.id + ''">
        <!-- 1系统总览 -->
        <el-sub-menu class="el-sub-menu" :index="item.id + ''">
          <template #title>
            <el-icon>
              <!-- <HomeFilled />  只需要动态替换这个就行 -->
              <component :is="item.icon.split('-icon-')[1]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="iten in item.children" :key="iten.id + ''">
            <el-menu-item :index="iten.id + ''" class="el-menu-item">
              <span>{{ iten.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import useLoginStore from '@/Stores/Module/login/login'

import { defineProps } from 'vue'
const props = defineProps({
  isFold: {
    type: Boolean,
    default:false
  }
})
const loginStore = useLoginStore()
const usermenu = loginStore.usermenu
</script>
<style scoped lang="less">
.el-menu {
  border: none;
}
.main-menu-wrapper {
  cursor: pointer;
  height: 100%;
  background-color: #001529;

  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  transition: width 0.3s ease;
  &::-webkit-scrollbar {
    display: none;
  }
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    align-items: center;
    img {
      margin-left: 8px;
      height: 100%;
    }
    .title {
      font-size: 16px;
      font-weight: 800;
      color: rgb(255, 183, 0);
      white-space: nowrap;
      margin-left: 12px;
    }
  }
  .el-sub-menu {
    background-color: #001529;
    .el-menu-item {
      color: #98a2ac;
      padding-left: 50px !important;
      background-color: #0c2135;
    }
    .el-menu-item :hover {
      color: #fff;
    }
    .el-menu-item.is-active {
      color: #fff;
      background-color: #0a60bd;
    }
  }
}
</style>
