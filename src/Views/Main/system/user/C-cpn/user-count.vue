<template>
  <div class="userCountWrapper">
    <div class="top">
      <h1 class="title">用户列表</h1>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="serarcount">
      <el-table :data="list" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />

        <el-table-column
          align="center"
          label="用户名"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        />
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        />
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="100px"
        />
        <el-table-column align="center" label="创建时间" prop="createAt" />
        <el-table-column align="center" label="更新时间" prop="updateAt" />

        <el-table-column align="center" label="操作" width="150px">
          <el-button size="small" icon="Edit" type="primary" text>
            编辑
          </el-button>
          <el-button size="small" icon="Delete" type="danger" text>
            删除
          </el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { systemstore } from '@/Stores/Module/main/system/index'
const store = systemstore()
// 发起网络请求获取数据
store.getsystemUserlistData()
const { list, totalCount } = storeToRefs(store)
</script>
<style scoped lang="less">
.userCountWrapper {
  padding: 20px;
  .top {
    .title {
      font-weight: 800;
      font-size: 22px;
    }
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 13px;
  }
  .serarcount {

    margin-top: 20px;
  }
}
</style>
