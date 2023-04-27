export const menuCountConfig = {
  title: '菜单管理',
  btnTex: '新建菜单',
  pagename: 'menu',
  propsList: [
    { label: '菜单名称', prop: 'name', width: '180px' },
    { label: '级别', prop: 'type', width: '120px' },
    { label: '菜单url', prop: 'url', width: '150px' },
    { label: '菜单icon', prop: 'icon', width: '200px' },
    { label: '排序', prop: 'sort', width: '120px' },
    { label: '权限', prop: 'permission', width: '150px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}
export const menuDialogConfig = {
  createtitle: '创建菜单',
  edittitle: '编辑菜单',
  pagename: 'menu',
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

/*
{
    "name": "商品信息",
    "type": 2,
    "url": "/product/goods",
    "sort": 104,
    "parentId": 9
}
 */
