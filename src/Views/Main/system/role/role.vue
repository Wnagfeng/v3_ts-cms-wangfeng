<template>
  <div class="role">
    <div class="search">
      <pageSearch :search-config="searchaConfig" ref="pageSearch"></pageSearch>
    </div>
    <div class="count">
      <pageCount
        :department-coun-config="countConfig"
        @create-user="handlcreatepage"
        @edit-user="handlEdit"
      ></pageCount>
    </div>
    <pageDialog
      :department-dialog-config="dialog"
      ref="pagedialog"
    ></pageDialog>
  </div>
</template>

<script setup lang="ts" name="role">
import { ref } from 'vue'
import { searchaConfig, countConfig, dialog } from './search.config'
// import pageSearch from '@/Components/mainPage/page-search.vue'
import pageCount from '@/Components/mainPage/page-count.vue'
import pageDialog from '@/Components/mainPage/page-dialog.vue'

// 页面逻辑
const pagedialog = ref<InstanceType<typeof pageDialog>>()
// const pageSearch = ref<InstanceType<typeof pagesearch>>()
// function handlpagesearchclick(querydata: any) {
//   pageSearch.value?.fetchsearchdata(querydata)
// }
function handlcreatepage() {
  pagedialog.value?.changecenterDialogVisible(true)
}
function handlEdit(EditData: any) {
  pagedialog.value?.changecenterDialogVisible(false, EditData)
}
// 页面逻辑
</script>

<style scoped lang="less">
.role {
  .search {
    background-color: #fff;
    border-radius: 20px;
  }
}
</style>
