<template>
  <div class="userCountWrapper">
    <div class="top">
      <h1 class="title">用户列表</h1>
      <el-button type="primary" @click="handleuserClick">新建用户</el-button>
    </div>
    <div class="serarcount">
      <el-table :data="pagelist" border style="width: 100%" max-height="600px">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />

        <el-table-column
          align="center"
          label="部门名称"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="部门领导"
          prop="leader"
          width="150px"
        />
        <el-table-column
          align="center"
          label="上级部门"
          prop="parentId"
          width="150px"
        />

        <el-table-column
          align="center"
          label="创建时间"
          prop="createAt"
          min-width="250px"
        >
          <template #default="scope">
            {{ formatUtcString(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="更新时间"
          prop="updateAt"
          min-width="250px"
        >
          <template #default="scope">
            {{ formatUtcString(scope.row.createAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="165px">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="EditUserData(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="deleteClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagetotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { systemstore } from '@/Stores/Module/main/system/index'
import { formatUtcString } from '@/Utils/Fomart-Data-Time'
import { ref } from 'vue'
const emit = defineEmits(['createUser', 'EditUser'])
const currentPage = ref(1)
const pageSize = ref(10)
const store = systemstore()

// 发起网络请求获取数据
fetchUserlistData()
const { pagelist, pagetotalCount } = storeToRefs(store)

function handleSizeChange() {
  // 改变页码的时候调用
  fetchUserlistData()
}
function handleCurrentChange() {
  // 翻页调用
  fetchUserlistData()
}

// 点击不同的页码展示不同的数据
/*
当点击pageSize时在一页展示不同量的数据
当点击currentPage是展示不同页面的数据
 */
// 定义函数用于发送网络请求
function fetchUserlistData(fromdata: any = {}) {
  // size你每次请求需要拿多少数
  const size = pageSize.value //根据当前页面需要展示多少数据去请求数据
  const offset = (currentPage.value - 1) * size
  const info = {
    size,
    offset,
    ...fromdata
  }
  // 定义一个请求的状态 用户发聩给用户
  const res = store.GetuserpagedataAction('department',info)
  return res
}

// 删除用户的逻辑
function deleteClick(id: any) {
  store.DeletepagelistdataAction('department',id).then((res) => {
    console.log(id);

    fetchUserlistData()
  })
}

function handleuserClick() {
  // 当点击这个事件的时候我们需要派发一个事件让外界知道我们点击了他
  emit('createUser')
}
// 修改用户信息的函数
function EditUserData(EditData: any) {
  // 当点击这个事件的时候我们需要派发一个事件让外界知道我们点击了他
  // 当点击这个事件以后我们把点击的数据传递出去用它来作为编辑的数据
  emit('EditUser', EditData)
}
defineExpose({ fetchUserlistData })
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
    align-items: center;
    margin-top: 13px;
  }
  .serarcount {
    margin-top: 20px;
  }
  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
