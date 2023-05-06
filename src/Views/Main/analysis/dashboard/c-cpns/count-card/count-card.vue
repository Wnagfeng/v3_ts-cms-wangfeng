<template>
  <el-col :span="6">
    <div class="inner">
      <div class="top">
        <span class="title">{{ title }}</span>
        <el-tooltip :content="tips" placement="top">
          <el-icon><Warning /></el-icon>
        </el-tooltip>
      </div>
      <div class="count" ref="number1">{{ number1 }}</div>
      <div class="sub">
        <span class="subtitle">{{ subtitle }}</span>
        <span class="data" ref="number2">{{ number2 }}</span>
      </div>
    </div>
  </el-col>
</template>
<script setup lang="ts">
import { CountUp } from 'countup.js'
import { onMounted, ref } from 'vue'
interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}
const props = defineProps<IProps>()
const number1 = ref()
const number2 = ref()
onMounted(() => {
  const countUp1 = new CountUp(number1.value, props.number1!, {
    prefix: props.amount == 'saleroom' ? '$' : ''
  })
  const countUp2 = new CountUp(number2.value, props.number2!, {
    prefix: props.amount == 'saleroom' ? '$' : ''
  })
  countUp1.start()
  countUp2.start()
})
</script>
<style scoped lang="less">
.inner {
  padding: 15px;
  display: inline-block;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .top {
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .count {
    margin-top: 5px;
    margin-bottom: 5px;
    flex: 1;
    font-size: 27px;
    color: black;
  }
  .sub {
    border-top: 1px solid black;
    height: 18px;
    line-height: 28px;
    .subtitle {
      font-size: 14px;
      color: black;
      margin-right: 5px;
    }
  }
}
</style>
