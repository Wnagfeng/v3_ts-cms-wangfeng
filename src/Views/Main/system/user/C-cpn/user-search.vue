<template>
  <div class="UserSearchWrapper">
    <h1 class="title">查询用户</h1>
    <!-- <el-button :plain="true" @click="open2">success</el-button> -->
    <el-form :model="formInfo" ref="form">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="ID" prop="id" label-width="68px ">
            <el-input placeholder="请输入用户ID" v-model="formInfo.id" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="用户名" prop="name" label-width="68px ">
            <el-input
              placeholder="请输入用户名"
              v-model="formInfo.name"
            /> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              placeholder="请输入用户真实姓名"
              v-model="formInfo.realname"
            /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input
              placeholder="请输入用户电话号码"
              v-model="formInfo.cellphone"
            /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="用户状态" prop="enable">
            <el-select
              placeholder="请选择用户状态 "
              style="width: 100%"
              v-model="formInfo.enable"
            >
              <el-option label="启用" value="shanghai" />
              <el-option label="禁用" value="beijing" />
            </el-select> </el-form-item
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
import { computed, reactive, ref, watch } from 'vue'
import { systemstore } from '@/Stores/Module/main/system/index'
import { storeToRefs } from 'pinia'
const userstore = systemstore()
const { totalCount } = storeToRefs(userstore)

const emit = defineEmits(['SearchCLick', 'ResetClick'])
const form = ref<InstanceType<typeof ElForm>>()
const formInfo = reactive({
  id: '',
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})
function handlResetClick() {
  form.value?.resetFields()
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
