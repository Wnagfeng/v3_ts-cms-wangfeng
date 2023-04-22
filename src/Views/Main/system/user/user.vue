<template>
  <div class="user">
    <userSearch></userSearch>
  </div>
  <div class="count">
    <userCount></userCount>
  </div>
</template>

<script setup lang="ts" name="user">
import userSearch from './C-cpn/user-search.vue'
import userCount from './C-cpn/user-count.vue'
</script>

<style scoped>
.user {
  background-color: #fff;
  border-radius: 20px;
}
.count {
  overflow: hidden;
  margin-top: 30px;
  background-color: #fff;
  border-radius: 20px;
}
</style>
