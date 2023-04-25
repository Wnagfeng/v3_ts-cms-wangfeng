<template>
  <div class="UserSearchWrapper">
    <h1 class="title">查询部门</h1>
    <!-- <el-button :plain="true" @click="open2">success</el-button> -->
    <el-form :model="formInfo" ref="form">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name" label-width="68px ">
            <el-input
              placeholder="请输入部门名称"
              v-model="formInfo.name"
            /> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input
              placeholder="请输入部门领导姓名"
              v-model="formInfo.leader"
            /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="formInfo.createAt"
              type="daterange"
              range-separator="——"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            /> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <div class="button">
      <el-button :icon="RefreshRight" @click="handlResetClick">重置</el-button>
      <el-button type="primary" :icon="Search" @click="handlSearchCLick"
        >搜索</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { Search, RefreshRight } from '@element-plus/icons-vue'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import { systemstore } from '@/Stores/Module/main/system'
const store = systemstore()
const emit = defineEmits(['SearchCLick', 'ResetClick'])
const form = ref<InstanceType<typeof ElForm>>()
const formInfo = reactive({
  name: '',
  leader: '',
  createAt: ''
})
const info = {
  offset: 0,
}
function handlResetClick() {
  form.value?.resetFields()
  store.GetuserpagedataAction('department',info)
}
function handlSearchCLick() {
  // 当点击搜索按钮以后把我们的搜索字段携带出去
  emit('SearchCLick', formInfo)
}
</script>
<style scoped lang="less">
.UserSearchWrapper {
  .title {
    text-align: center;
    font-size: 30px;
    font-weight: 800;
    color: red;
  }
  padding: 20px;
  .el-form {
    padding: 20px;
    .el-row {
      padding: 20px;
    }
  }
  .button {
    text-align: right;
    margin-right: 40px;
  }
}
</style>
