<template>
  <div class="user">
    <userSearch @search-c-lick="handlSearchClick"></userSearch>
  </div>
  <div class="count">
    <userCount
      ref="userCountRef"
      @createUser="createUserClick"
      @edit-user="handlEditUserData"
    ></userCount>
  </div>
  <userDialog ref="userdialog"></userDialog>
</template>

<script setup lang="ts" name="user">
import userSearch from './C-cpn/user-search.vue'
import userCount from './C-cpn/user-count.vue'
import userDialog from './C-cpn/user-dialog.vue'
import { ref } from 'vue'
const userdialog = ref()
const userCountRef = ref()

function handlSearchClick(frominfo: any) {
  userCountRef.value
    ?.fetchUserlistData(frominfo)
    .then((res: any) => {
      ElMessage({
        message: '查询成功',
        type: 'success'
      })
    })
    .catch((rej: any) => {
      ElMessage.error('查询失败')
    })
}

// 用户点击以后究竟是编辑还是新建我们需要传递一个标识符过去
function createUserClick() {
  // 是创建用户传递true
  userdialog.value.changecenterDialogVisible(true)
}

// 当用户点击编辑的逻辑
function handlEditUserData(EditData: any) {
  // 不是创建传递一个false
  userdialog.value.changecenterDialogVisible(false, EditData)
}
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
