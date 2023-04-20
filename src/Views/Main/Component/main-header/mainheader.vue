<template>
  <div class="Main-header-Wrapper">
    <!-- 按钮 -->
    <!--面包屑 -->
    <div class="left">
      <div class="buton" @click="Btnclick">
        <el-icon :size="30" v-if="isFold">
          <Expand />
        </el-icon>
        <el-icon :size="30" v-else>
          <Fold />
        </el-icon>
      </div>

      <div class="Breadcrumb">
        <breadcrumb></breadcrumb>
      </div>
    </div>

    <!-- 用户信息 -->
    <div class="userinfo">
      <span class="icon">
        <el-icon size="20px">
          <Message />
        </el-icon>
      </span>
      <span class="icon">
        <el-icon size="20px">
          <ChatDotRound />
        </el-icon>
        <span class="dtos"></span>
      </span>
      <span class="icon">
        <el-icon size="20px">
          <Search />
        </el-icon>
      </span>
      <span class="img">
        <el-dropdown tabindex="" :teleported="false">
          <div class="info">
            <el-col :span="12">
              <el-avatar
                :size="30"
                src="https://img0.baidu.com/it/u=3501617850,3346833213&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300"
              />
            </el-col>
            <span class="name">汪枫</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="extLogin">
                <el-icon><CircleClose /></el-icon>
                退出系统
              </el-dropdown-item>
              <el-dropdown-item :divided="true">
                <el-icon><InfoFilled /></el-icon>
                个人信息
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon><Lock /></el-icon>
                修改密码
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
// 维护一个状态用来表示是否关闭和展开
import { localCache } from '@/Utils/Cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { ref } from 'vue'
import router from '@/router'
import { ElMessage } from 'element-plus'
import breadcrumb from './breadcrumb.vue'

// 暴露一个自定义事件
const emits = defineEmits(['changeFold'])
const isFold = ref(false) //默认不是关闭
// 切换关闭与打开的逻辑
function Btnclick() {
  isFold.value = !isFold.value
  // 点击的时候把状态传递出去让menu的展开和打开都依赖于他
  emits('changeFold', isFold.value)
}

function extLogin() {
  localCache.removeCache(LOGIN_TOKEN)

  ElMessage({
    message: '退出成功',
    type: 'warning'
  })
  router.push('/login')
}
</script>
<style scoped lang="less">
.Main-header-Wrapper {
  height: 50px !important;
  display: flex;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    flex: 1;

    .Breadcrumb {
      margin-left: 20px;
    }
  }

  .userinfo {
    display: flex;

    align-items: center;

    .icon {
      margin-left: 20px;
      &:hover {
        color: skyblue;
      }

      .dtos {
        position: absolute;
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: red;
      }
    }

    .img {
      margin-left: 20px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      font-weight: 700;
      .info {
        margin-left: 10px;
        align-items: center;
        display: flex;
        width: 80px;
        border: none !important;
      }

      // 为什么是global 而不是deep因为他是渲染在全局组件当中
      // 如果你渲染在全局你就给我用 ：global
      // 如果你渲染在局部你就给我用 ：deep
      :deep(.el-dropdown-menu__item) {
        font-weight: 700;
        color: rgb(0, 0, 0);
      }
    }
  }
}
</style>
