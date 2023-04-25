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
        :department-coun-config="departmentCounConfig"
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
    <pageDialog
      :department-dialog-config="departmentDialogdata"
      ref="pagedialog"
    ></pageDialog>
  </div>
</template>

<script setup lang="ts" name="department">
import pagesearch from './c-pns/page-search.vue'
import pagecount from '@/Components/mainPage/page-count.vue'
import pageDialog from '@/Components/mainPage/page-dialog.vue'
import { systemstore } from '@/Stores/Module/main/system'
import { computed, ref } from 'vue'
import { systemStoreMain } from '@/Stores/Module/main/system/main'
import {
  departmentCounConfig,
  departmentDialogConfig
} from './department.config'

const systemSstore = systemStoreMain()
const store = systemstore()
// 对配置文件数据进行劫持获取全部部门数据给他塞进去
const departmentDialogdata = computed(() => {
  // 拿到全部部门的数据--这里的数据是name和id我们需要的是lable和value
  const alldepartementData = systemSstore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  departmentDialogConfig.propsList.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.opstion?.push(...alldepartementData)
    }
  })
  return departmentDialogConfig
})

// 页面逻辑
const pagedialog = ref<InstanceType<typeof pageDialog>>()
const pageSearch = ref<InstanceType<typeof pagesearch>>()
function handlpagesearchclick(querydata: any) {
  pageSearch.value?.fetchsearchdata(querydata)
}
function handlcreatepage() {
  pagedialog.value?.changecenterDialogVisible(true)
}
function handlEdit(EditData: any) {
  pagedialog.value?.changecenterDialogVisible(false, EditData)
}
// 页面逻辑
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
