<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="
      isCreate
        ? props.departmentDialogConfig.createtitle
        : props.departmentDialogConfig.edittitle
    "
    width="30%"
    center
  >
    <div class="form">
      <el-form :model="formInfo" label-width="80px" size="large">
        <template v-for="item in props.departmentDialogConfig.propsList">
          <template v-if="item.type == 'input'">
            <el-form-item :label="item.label" :prop="item.prop">
              <el-input
                v-model="formInfo[item.prop]"
                :placeholder="item.placeholder"
              />
            </el-form-item>
          </template>
          <template v-else="item.type == 'select'">
            <el-form-item :label="item.label" :prop="item.prop">
              <el-select
                v-model="formInfo[item.prop]"
                :placeholder="item.propsList"
                style="width: 100%"
              >
                <template v-for="iten in item.opstion">
                  <el-option :label="iten.label" :value="iten.value" />
                </template>
              </el-select>
            </el-form-item>
          </template>
        </template>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="entercenterDialogVisible">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { systemStoreMain } from '@/Stores/Module/main/system/main'
import { systemstore } from '@/Stores/Module/main/system/index'
import { storeToRefs } from 'pinia'
const sysstore = systemstore()
const store = systemStoreMain()

interface IProps {
  departmentDialogConfig: {
    createtitle: string
    edittitle: string
    pagename: string
    propsList: any[]
  }
}
const props = defineProps<IProps>()
const inittialForm: any = {}
for (const item of props.departmentDialogConfig.propsList) {
  // 如果你想做默认值你需要在这里搞 因为他这个东西一上来不展示
  /*
  默认值的逻辑
  for (const key in formData) {
    const item = props.modalConfig.formItems.find((item) => item.prop === key)
    formData[key] = item ? item.initialValue : ''
  }
   */
  inittialForm[item.prop] = ''
}
// 保存输入的地方
const formInfo = reactive(inittialForm)

// 创建一个用于保存修改信息的对象
const changeuseroinfoData = ref()
// 是否展示新建或者编辑页面
const centerDialogVisible = ref(false)
// 是否是创建用户的标识符
const isCreate = ref(false)
// 保存我们需要修改的数据发生
function changecenterDialogVisible(iscreate: boolean, EditData?: any) {
  // 当点击编辑以后我们把点击的数据对象拿过来 但是他不是必选的
  centerDialogVisible.value = true
  isCreate.value = iscreate
  // 如果是编辑数据我们就把该数据填充到formData中方便我们进行可视化编辑
  // 这个替换的操作只有在编辑的时候才能替换新建的操作必须是用户自己输入自己创建
  if (isCreate.value == false) {
    for (const key in formInfo) {
      // 根据formdata中的key去取到EditData中的value去替换formdata中的数据这样就能展示了
      formInfo[key] = EditData[key]
    }
    changeuseroinfoData.value = EditData
  } else {
    // 当用户不是编辑操作的时候我们就把数据设置为空
    for (const key in formInfo) {
      formInfo[key] = ''
    }
  }
}
// 获取数据的字段
const searinfo = {
  offset: 0
}
// 新建用户的函数
function entercenterDialogVisible() {
  // 如果是修改数据在用户点击确定以后需要发送修改信息的请求修改数据
  if (isCreate.value) {
    centerDialogVisible.value = false
    sysstore
      .CreatepagelistdataAction(props.departmentDialogConfig.pagename, formInfo)
      .then((res: any) => {
        // 发送新的请求获取新的数据
        sysstore.GetuserpagedataAction(
          props.departmentDialogConfig.pagename,
          searinfo
        )
      })
  } else {
    sysstore
      .ChangepagelistDataAction(
        props.departmentDialogConfig.pagename,
        changeuseroinfoData.value.id,
        formInfo
      )
      .then((res) => {
        if (res.code == 0) {
          ElMessage({
            message: '更新部门成功',
            type: 'success'
          })
          sysstore.GetuserpagedataAction(
            props.departmentDialogConfig.pagename,
            searinfo
          )
        }
      })
    centerDialogVisible.value = false
  }
}

defineExpose({ changecenterDialogVisible, entercenterDialogVisible })
</script>
<style scoped lang="less"></style>
