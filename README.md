# 小米科技后台管理系统

###  父组件获取子组件的数据

在子组件中定义一个函数通过defineExpose进行暴露父组件通过ref获取到子组件的实例来调用函数传递数据

 关键在于在ts中父组件对于子组件的ref的类型如何确定我们可以使用(<InstanceType<typeof UserLogin>>)

对齐进行类型推导即可

### 蛋疼点

在处理记住密码逻辑的时候不能单单对于数据进行监听然后改变本地存储

```js
let isRememberPassword = ref<boolean>(
  localCache.getCache('isRememberPassword') ?? false
)
watch(isRememberPassword, (newValue) => {
  changeLocateStore(newValue)
})

// 改变本地存储的数据
function changeLocateStore(newValue: boolean) {
     localCache.removeCache('isRememberPassword')----清除字段
  localCache.setCache('isRememberPassword', newValue)
}
```

不知道为啥能监听到数据却改变不了数据暂时没找到原因

于是我在更新以后直接清除该数据字段 让他是undefined 反正他能获取到false

