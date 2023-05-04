export const GoogSearchConfig = {
  pageName: 'goods',
  title: '查询商品信息',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      prop: 'address',
      label: '商品地址',
      placeholder: '请输入商品地址'
    },
    {
      type: 'select',
      prop: 'address',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '可用', value: 1 },
        { label: '下架', value: 0 }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export const GoogCountConfig = {
  title: '商品列表',
  btnTex: '新建商品',
  pagename: 'goods',
  propsList: [
    { type: 'selection', width: '50px', align: 'center' },
    { type: 'index', label: '序号', width: '80px', align: 'center' },
    {
      type: 'normal',
      label: '原价格',
      prop: 'oldPrice',
      width: '150px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '新价格',
      prop: 'newPrice',
      width: '150px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '商品描述',
      prop: 'desc',
      width: '150px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '状态',
      prop: 'status',
      width: '150px',
      align: 'center'
    },
    {
      type: 'custom',
      label: '图片',
      prop: 'imgUrl',
      width: '150px',
      slotName: 'imageSlot',
      align: 'center'
    },

    {
      type: 'normal',
      label: '销量',
      prop: 'saleCount',
      width: '150px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '收藏',
      prop: 'favorCount',
      width: '150px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '状态',
      prop: 'status',
      width: '150px',
      align: 'center'
    },
    {
      type: 'normal',
      label: '地址',
      prop: 'address',
      width: '250px',
    },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}
