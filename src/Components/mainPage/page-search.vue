<template>
  <div class="UserSearchWrapper">
    <h1 class="title">{{ props.searchConfig.title }}</h1>
    <!-- <el-button :plain="true" @click="open2">success</el-button> -->
    <el-form :model="formInfo" ref="form">
      <el-row :gutter="80">
        <template v-for="item in props.searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formInfo[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formInfo[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formInfo[item.prop]"
                >
                  <template v-for="iten in item.opsttion">
                    <el-option :label="iten.label" :value="iten.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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

interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
    title: string
  }
}
const props = defineProps<IProps>()

// 定义一个初始化对象
const inittialForm: any = {}
/*
我们只需要从props中拿到prop去放到inittialForm中那么inittialForm就是我们需要给from表单绑定的数据
 */
for (const item of props.searchConfig.formItems) {
  // 遍历props中的searchConfig.formItems从这里的每一个对象中拿到prop作为可以 值我们不需要
  inittialForm[item.prop] = ''
}
// 用初始化对象去初始化formInfo
const formInfo = reactive(inittialForm)

const info = {
  offset: 0
}
function handlResetClick() {
  form.value?.resetFields()
  store.GetuserpagedataAction('department', info)
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
