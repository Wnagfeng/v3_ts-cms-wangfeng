<template>
  <div class="department">
    <div class="srarch">
      <pagesearch
        @search-c-lick="handlpagesearchclick"
        ref="pageSearch"
      ></pagesearch>
    </div>
    <div class="count">
      <pagecount
        @create-user="handlcreatepage"
        @edit-user="handlEdit"
      ></pagecount>
    </div>
    <pageDialog ref="pagedialog"></pageDialog>
  </div>
</template>

<script setup lang="ts" name="department">
import pagesearch from './c-pns/page-search.vue'
import pagecount from './c-pns/page-count.vue'
import pageDialog from './c-pns/page-dialog.vue'
import { systemstore } from '@/Stores/Module/main/system'

import { ref } from 'vue'
const pagedialog = ref<InstanceType<typeof pageDialog>>()
const pageSearch = ref<InstanceType<typeof pagesearch>>()
const store = systemstore()
// 当点击search按钮时候调用
function handlpagesearchclick(querydata: any) {
  // 拿到组件的实例去调用查询请求函数
  pageSearch.value?.fetchsearchdata(querydata)
}
function handlcreatepage() {
  pagedialog.value?.changecenterDialogVisible(true)
}
function handlEdit(EditData: any) {
  pagedialog.value?.changecenterDialogVisible(false, EditData)
}
</script>

<style scoped lang="less">
.department {
  .srarch {
    background-color: #fff;
    border-radius: 20px;
  }
  .count {
    background-color: #fff;
    border-radius: 20px;
    margin-top: 20px;
  }
}
</style>
