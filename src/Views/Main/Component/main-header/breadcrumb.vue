<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <template v-for="item in Breadcrumb" >
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLoginStore from '@/Stores/Module/login/login'
import { mapPathToBreadcrumbName } from '@/Utils/map-menus'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const login = useLoginStore()
const usermenu = login.usermenu
const Breadcrumb = computed(() => {
  return mapPathToBreadcrumbName(route.path, usermenu)
})
</script>
<style scoped lang="less"></style>
