export const searchaConfig = {
  // 在这里写上配置语句在页面中对其进行渲染即可
  pageName: 'role', //网络请求的名称
  title: '查询角色',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入查询的角色名称'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '权限介绍',
      placeholder: '请输入查询的权限介绍'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建角色的时间'
    },
    {
      type: 'select',
      placeholder: '请选择角色',
      label: '角色选择',
      prop: 'enable',
      opsttion: [
        { label: '启动', value: 1 },
        { label: '启动1', value: 12 }
      ]
    }
  ]
}
