<template>
  <div class="role">
    <div class="search">
      <pageSearch
        :search-config="searchaConfig"
        ref="pagesearch"
        @search-c-lick="handlpagesearchclick"
      ></pageSearch>
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
      :menu-list="checkmenuid"
    >
      <template #menulist="scope">
        <el-tree
          ref="treeRef"
          :data="entireAllMenulist"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{
            children: 'children',
            label: 'name'
          }"
          @check="handlCheckClick"
        />
      </template>
    </pageDialog>
  </div>
</template>

<script setup lang="ts" name="role">
import { ref, nextTick } from 'vue'
import { searchaConfig, countConfig, dialog } from './search.config'
import pageSearch from '@/Components/mainPage/page-search.vue'
import pageCount from '@/Components/mainPage/page-count.vue'
import pageDialog from '@/Components/mainPage/page-dialog.vue'
import { systemStoreMain } from '@/Stores/Module/main/system/main'
import { storeToRefs } from 'pinia'
const treeRef = ref()
const pagesearch = ref<InstanceType<typeof pageSearch>>()
// 发送网络请求获取数据用在全部部门的展示
const mainStore = systemStoreMain()
mainStore.fetchgetAllmenulist()
const { entireAllMenulist } = storeToRefs(mainStore)

// 获取用户选中的权限的id 并且传递给表单发送网络请求获取数据
const checkmenuid: any = ref({})
function handlCheckClick(data1: any, data2: any) {
  let menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  checkmenuid.value = { menuList }
}

// 页面逻辑
const pagedialog = ref<InstanceType<typeof pageDialog>>()
// const pageSearch = ref<InstanceType<typeof pagesearch>>()
// function handlpagesearchclick(querydata: any) {
//   pageSearch.value?.fetchsearchdata(querydata)
// }
function handlcreatepage() {
  pagedialog.value?.changecenterDialogVisible(true)
}
function handlpagesearchclick(querydata: any) {
  console.log(querydata)
  pagesearch.value?.fetchsearchRoledata(1)
}
function handlEdit(EditData: any) {
  pagedialog.value?.changecenterDialogVisible(false, EditData)
  // 当我们点击编辑按钮后会拿到当前这一条数据的全部
  // 我们需要定义一个函数用来获取所有的id然后传递个组件进行展示
  const res = mapmenulisttoIds(EditData.menuList)
  nextTick(() => {
    treeRef?.value?.setCheckedKeys(res)
  })
}
// 去除id的逻辑
function mapmenulisttoIds(menuList: any[]) {
  const idS: number[] = []
  function mapidtoids(menus: any[]) {
    for (const item of menus) {
      // 如果当前的这段数据中有children就在调用一次这个函数
      if (item.children) {
        mapidtoids(item.children)
      } else {
        // 如果不存在就给我添加
        idS.push(item.id)
      }
    }
  }
  mapidtoids(menuList)
  return idS
}

// 页面逻辑
</script>

<style scoped lang="less">
.role {
  .search {
    background-color: #fff;
    border-radius: 20px;
  }
  .count {
    margin-top: 20px;
    background-color: #fff;
    border-radius: 20px;
  }
}
</style>
