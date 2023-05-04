<template>
  <div class="search">
    <pageSearch :search-config="GoogSearchConfig"></pageSearch>
  </div>
  <div class="coun">
    <pageCount :department-coun-config="GoogCountConfig">
      <template #imageSlot="scope">
        <div class="img">
          <img :src="scope.row.imgUrl" alt="" />
        </div>
      </template>
    </pageCount>
  </div>
</template>

<script setup lang="ts" name="goods">
import pageSearch from '@/Components/mainPage/page-search.vue'
import pageCount from '@/Components/mainPage/page-count.vue'
import { GoogSearchConfig, GoogCountConfig } from './Good.Config'
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  border-radius: 20px;
}
.coun {
  margin-top: 20px;
  background-color: #fff;
  border-radius: 20px;
  .img {
    display: inline-block;
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
