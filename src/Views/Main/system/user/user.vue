<template>
  <div class="user">
    <userSearch @search-c-lick="handlSearchClick"></userSearch>
  </div>
  <div class="count">
    <userCount ref="userCountRef" @createUser="createUserClick"></userCount>
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
  userCountRef.value?.fetchUserlistData(frominfo)
}
function createUserClick() {
  userdialog.value.changecenterDialogVisible()
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
