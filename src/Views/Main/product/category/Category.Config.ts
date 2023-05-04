export const SearchCounfig = {
  pageName: 'category',
  title: '查询商品类别',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '类别名称',
      placeholder: '请输入查询的角色'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '商品类别创建时间'
    }
  ]
}
export const SearchCountConfig = {
  title: '商品列表',
  btnTex: '新建商品',
  pagename: 'category',
  propsList: [
    { type: 'selection', width: '50px', align: 'center' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '商品名称', prop: 'name', width: '150px' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}
