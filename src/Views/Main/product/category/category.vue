<template>
  <div class="search">
    <pageSearch :search-config="SearchCounfig"></pageSearch>
  </div>
  <div class="count">
    <pageCount :department-coun-config="SearchCountConfig"></pageCount>
  </div>
</template>

<script setup lang="ts" name="category">
import pageSearch from '@/Components/mainPage/page-search.vue'
import pageCount from '@/Components/mainPage/page-count.vue'
import { SearchCounfig, SearchCountConfig } from './Category.Config'
</script>

<style scoped>
.search {
  background-color: #fff;
  border-radius: 20px;
}
.count{
  background-color: #fff;
  border-radius: 20px;
  margin-top: 20px;
}
</style>
