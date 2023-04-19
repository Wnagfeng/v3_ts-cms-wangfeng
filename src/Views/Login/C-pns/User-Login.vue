<template>
  <div class="UserLogin">
    <el-form
      label-width="60px"
      :rules="rules"
      :model="UserCoutn"
      ref="UserLogin"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="UserCoutn.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="UserCoutn.password" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, defineExpose } from 'vue'
import { ref } from 'vue'
import useLoginStore from '@/Stores/Module/login/login'
import type { FormRules, ElForm } from 'element-plus'
import { localCache } from '@/Utils/Cache'
const login = useLoginStore()
// 定义常量
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'
const UserLogin = ref<InstanceType<typeof ElForm>>()
// 定义保存用户输入的内容
const UserCoutn = reactive({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 定义校验的规则
const rules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}
// 搞函数暴露出去给子组件调用
function LoginAction(isRememberPassword: boolean) {
  UserLogin.value?.validate((valid, fields) => {
    if (valid) {
      const name = UserCoutn.name
      const password = UserCoutn.password
      // 拿到账号信息发送网络请求
      login
        .loginAccountAction({ name, password })
        .then((res: any) => {
          ElMessage({
            message: '登录成功',
            type: 'success'
          })
          // 当登录成功以后我们进行记住密码
          if (isRememberPassword) {
            localCache.setCache(CACHE_NAME, name)
            localCache.setCache(CACHE_PASSWORD, password)
          } else {
            localCache.removeCache(CACHE_NAME)
            localCache.removeCache(CACHE_PASSWORD)
          }
        })
        .catch((err) => {
          ElMessage.error('账号或者密码不对')
        })
      // 如果记住密码为true我们就放到storage中
    } else {
      ElMessage.error('账号或者密码不对')
    }
  })
}

defineExpose({
  LoginAction
})
</script>
<style scoped lang="less"></style>
