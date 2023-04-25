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

export const countConfig = {
  title: '角色列表',
  btnTex: '新建角色',
  pagename: 'role',
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '角色名称', prop: 'name', width: '150px' },
    { type: 'normal', label: '权限介绍', prop: 'intro', width: '180px' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export const dialog = {
  createtitle: '新建角色',
  edittitle: '编辑角色',
  pagename: 'role',
  propsList: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍'
    }
  ]
}
