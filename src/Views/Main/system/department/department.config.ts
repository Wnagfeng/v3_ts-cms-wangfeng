export const departmentSrarchConfig = {}

export const departmentCounConfig = {
  title: '部门列表',
  btnTex: '新建部门',
  pagename: 'department',
  propsList: [
    { type: 'selection', width: '50px', align: 'center' },
    { type: 'index', label: '序号', width: '60px', align: 'center' },
    {
      type: 'normal',
      label: '部门名称',
      prop: 'name',
      width: '150px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '部门领导',
      prop: 'leader',
      width: '150px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '上级部门',
      prop: 'parentId',
      width: '150px',
      align: 'center'
    },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', prop: 'updateAt', width: '165px' }

    // {
    //   type: 'custom',
    //   label: '部门领导',
    //   prop: 'leader',
    //   width: '150px',
    //   slotName: 'leader'
    // },
    // {
    //   type: 'custom',
    //   label: '上级部门',
    //   prop: 'parentId',
    //   width: '150px',
    //   slotName: 'parent'
    // }
  ]
}
export const departmentSearchConfig = {}
export const departmentDialogConfig:any = {
  createtitle: '创建部门',
  edittitle: '编辑部门',
  pagename: 'department',
  propsList: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导'
    },
    {
      type: 'select',
      placeholder: '请选择上级部门',
      label: '上级部门',
      prop: 'parentId',
      opstion: [
        // 这里的数据让数据劫持过来push过来
      ]
    }
  ]
}
