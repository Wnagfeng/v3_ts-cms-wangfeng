<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="isCreate ? '新建用户' : '编辑用户'"
    width="30%"
    center
  >
    <div class="form">
      <el-form :model="formData" label-width="80px" size="large">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select
            v-model="formData.roleId"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <!-- 从store中拿到数据放到这里 -->
            <template v-for="item in entireRoles">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select
            v-model="formData.departmentId"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <template v-for="item in entireDepartments">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
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
const { entireDepartments, entireRoles } = storeToRefs(store)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
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
    for (const key in formData) {
      // 根据formdata中的key去取到EditData中的value去替换formdata中的数据这样就能展示了
      formData[key] = EditData[key]
    }
    changeuseroinfoData.value = EditData
  } else {
    // 当用户不是编辑操作的时候我们就把数据设置为空
    for (const key in formData) {
      formData[key] = ''
    }
  }
}
// 获取数据的字段
const searinfo = {
  offset: 0,
  size: 10
}
// 新建用户的函数
function entercenterDialogVisible() {
  // 如果是修改数据在用户点击确定以后需要发送修改信息的请求修改数据
  if (isCreate.value) {
    centerDialogVisible.value = false
    sysstore.CreateuserlistdataAction(formData).then((res: any) => {
      if (res.code == 400) {
        ElMessage.error('创建用户失败,请检查创建信息是否完善')
      } else {
        // 发送新的请求获取新的数据
        sysstore.GetuserlistdataAction(searinfo)
        ElMessage({
          message: '创建用户成功',
          type: 'success'
        })
      }
    })
  } else {
    changeuerinfo(changeuseroinfoData.value.id, formData)
  }
}
// 编辑用户的函数
function changeuerinfo(id: any, info: any) {
  sysstore.ChangeuserlistDataAction(id, info).then((res: any) => {
    centerDialogVisible.value = false
    if (res.code == -1003) {
      ElMessage.error('修改用户信息失败,您的权限不够')
    } else {
      // 发送新的请求获取新的数据
      sysstore.GetuserlistdataAction(searinfo)
      ElMessage({
        message: '修改用户信息成功',
        type: 'success'
      })
    }
  })
}
defineExpose({ changecenterDialogVisible, entercenterDialogVisible })
</script>
<style scoped lang="less"></style>
