<template>
  <div class="Login">
    <div class="inner">
      <div class="top">
        <div class="title">小米科技后台管理系统</div>
      </div>
      <div class="count">
        <el-tabs
          type="border-card"
          class="demo-tabs"
          :stretch="true"
          v-model="activeName"
        >
          <el-tab-pane label="用户登录" name="UserLogin">
            <template #label>
              <div class="label">
                <el-icon><User /></el-icon>
                <span class="text">用户登录</span>
              </div>
            </template>
            <UserLogin ref="UserLoginRef"></UserLogin>
          </el-tab-pane>
          <el-tab-pane label="手机登录" name="PhoneLogin">
            <template #label>
              <div class="label">
                <el-icon><Message /></el-icon>
                <span class="text">手机登录</span>
              </div>
            </template>
            <PhoneLogin></PhoneLogin>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="ctrl">
        <el-checkbox
          v-model="isRememberPassword"
          label="记住密码"
          size="large"
        />
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button type="primary" @click="handlTabsClick">立即登录</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import UserLogin from '@/Views/Login/C-pns/User-Login.vue'
import PhoneLogin from '@/Views/Login/C-pns/Phone-Login.vue'
import { localCache } from '@/Utils/Cache'

const UserLoginRef = ref()
let activeName = ref('UserLogin')

let isRememberPassword = ref<boolean>(
  localCache.getCache('isRememberPassword') ?? false
)
watch(isRememberPassword, (newValue) => {
  changeLocateStore(newValue)
})

// 改变本地存储的数据
function changeLocateStore(newValue: boolean) {
  localCache.removeCache('isRememberPassword')
  localCache.setCache('isRememberPassword', newValue)
}
// 判断用户在使用什么方式进行登录
function handlTabsClick() {
  if (activeName.value === 'UserLogin') {
    // 在这里我们需要获取在UserLogin中的UserCoutn中的name和password
    // 1拿到组件去发送网络请求获取token
    UserLoginRef?.value?.LoginAction(isRememberPassword.value)
  } else {
    console.log('用户在用手机号进行登录')
  }
}
</script>
<style scoped lang="less">
.Login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/img/login-bg.svg');
  .inner {
    width: 330px;
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      .title {
        font-size: 33px;
        font-weight: 800;
      }
      img {
        width: 50px;
        height: 50px;
      }
    }
    .ctrl {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      line-height: 30px;
    }
    .el-checkbox.el-checkbox--large {
      height: 30px;
    }
    .el-button {
      margin-top: 20px;
      height: 40px;
    }
    .count {
      margin-top: 20px;
      .label {
        display: flex;
        align-items: center;
        .text {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
