<template>
  <div class="role">
    <div class="search">
      <pageSearch :search-config="searchaConfig"></pageSearch>
    </div>
  </div>
</template>

<script setup lang="ts" name="role">
import { searchaConfig } from './config/search.config'
import pageSearch from '@/Components/mainPage/page-search.vue'
</script>

<style scoped lang="less">
.role {
  .search {
    background-color: #fff;
    border-radius: 20px;
  }
}
</style>
