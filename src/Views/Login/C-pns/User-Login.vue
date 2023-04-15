<template>
  <div class="UserLogin">
    <el-form label-width="60px">
      <el-form-item label="账号" :required="true">
        <el-input />
      </el-form-item>
      <el-form-item label="密码" :required="true">
        <el-input />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="less"></style>
