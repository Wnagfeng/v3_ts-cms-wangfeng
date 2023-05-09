<template>
  <div class="userCountWrapper">
    <div class="top">
      <h1 class="title">
        {{ props.departmentCounConfig.title ?? '数据列表' }}
      </h1>
      <el-button v-if="isCreate" type="primary" @click="handleuserClick">{{
        props.departmentCounConfig.btnTex ?? '创建数据'
      }}</el-button>
    </div>
    <div class="serarcount" v-if="isQuery">
      <el-table
        :data="pagelist"
        border
        style="width: 100%"
        max-height="600px"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <template v-for="item in props.departmentCounConfig.propsList">
          <template v-if="item.type == 'timer'">
            <el-table-column
              align="center"
              :label="item.label"
              :prop="item.prop"
              min-width="250px"
            >
              <template #default="scope">
                <!-- 从数据中拿到时间 -->
                {{ formatUtcString(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type == 'handler'">
            <el-table-column align="center" label="操作" width="165px">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="EditUserData(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
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
          </template>
          <!-- 这里是定制化插槽--需求实现任意元素的展示 -->
          <template v-else-if="item.type == 'custom'">
            <!-- 实现插槽 -->
            <el-table-column align="center" v-bind="item">
              <!-- 在这里留下一个具名插槽让开发者传递进来 name由数据传递进来 -->
              <!-- 这里是el-table-column给我们预留的插槽 -->
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                  :slotdata="item"
                ></slot>
              </template>
              <!-- 这里在组件的使用中传递够来 -->
            </el-table-column>
          </template>
          <template v-else-if="item.type == 'selection'">
            <el-table-column align="center" v-bind="item" />
          </template>
          <template v-else>
            <el-table-column
              align="center"
              v-bind="item"
              row-key="id"
              :show-overflow-tooltip="true"
            />
          </template>
        </template>
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

import { mapPermission } from './Hooks/mapPermission'
import { ref, reactive } from 'vue'

interface IProps {
  departmentCounConfig: {
    title: string
    btnTex: string
    pagename: string
    propsList: any[]
  }
}
const props = defineProps<IProps>()

// 获取该用户的所有的权限 根据该权限决定是否展示编辑删除按钮 新建用户的按钮 还有搜索的页面

// 7.按钮是否显示
const isCreate = mapPermission(props.departmentCounConfig.pagename, 'create')
const isDelete = mapPermission(props.departmentCounConfig.pagename, 'delete')
const isUpdate = mapPermission(props.departmentCounConfig.pagename, 'update')
const isQuery = mapPermission(props.departmentCounConfig.pagename, 'query')
console.log(isCreate)

const inittialForm: any = {}
for (const item of props.departmentCounConfig.propsList) {
  inittialForm[item.prop] = ''
}
const formInfo = reactive(inittialForm)

const emit = defineEmits(['createUser', 'EditUser'])
const currentPage = ref(1)
const pageSize = ref(10)
const store = systemstore()

// 监听函数的执行在修改完数据以后我们把页码设置为1因为他会自动跳转到第一页
store.$onAction(({ name, after }) => {
  after(() => {
    if (
      name == 'ChangepagelistDataAction' ||
      name == 'DeletepagelistdataAction' ||
      name == 'CreatepagelistdataAction'
    ) {
      currentPage.value = 1
    }
  })
})

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

// 点击不同的页码展示不同的数据b
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
  const res = store.GetuserpagedataAction(
    props.departmentCounConfig.pagename,
    info
  )
  return res
}

// 删除用户的逻辑
function deleteClick(id: any) {
  store
    .DeletepagelistdataAction(props.departmentCounConfig.pagename, id)
    .then((res) => {
      console.log(id)

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
  console.log('EditData', EditData)

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
