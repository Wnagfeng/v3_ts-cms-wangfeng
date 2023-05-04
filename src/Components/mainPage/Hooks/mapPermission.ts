import useLoginStore from '@/Stores/Module/login/login'
const LoginStore = useLoginStore()
const { Permission } = LoginStore
export function mapPermission(pagename: string, handlname: string) {
  const handlePermission = `${pagename}:${handlname}` //需要对比的名称根据不同的页面有不同的操作
  return !!Permission.find((item: any) => item.includes(handlePermission))
}
