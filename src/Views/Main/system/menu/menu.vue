<template>
  <div class="count">
    <pagecount
      :department-coun-config="menuCountConfig"
      @create-user="handlcreatepage"
      @edit-user="handlEdit"
    >
      <!-- 这里的具名也要让他给我传递过来 -->
      <template #leader="scope">
        <span class="leader">哈哈哈: {{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">呵呵呵: {{ scope.row[scope.prop] }}</span>
      </template>
    </pagecount>
  </div>
  <pageDialog :department-dialog-config="menuDialogConfig" ref="pagedialog">
   
  </pageDialog>
</template>

<script setup lang="ts" name="menu">
import { menuCountConfig, menuDialogConfig } from './MenuCounfig'
import pagecount from '@/Components/mainPage/page-count.vue'
import pageDialog from '@/Components/mainPage/page-dialog.vue'
import { ref } from 'vue'

// 页面逻辑
const pagedialog = ref<InstanceType<typeof pageDialog>>()

function handlcreatepage() {
  pagedialog.value?.changecenterDialogVisible(true)
}
function handlEdit(EditData: any) {
  pagedialog.value?.changecenterDialogVisible(false, EditData)
}
// 页面逻辑
</script>

<style scoped>
.count {
  background-color: #fff;
  border-radius: 20px;
}
</style>
