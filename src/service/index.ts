import { localCache } from '@/Utils/Cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

const wfrequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 在这里给每个请求都加上一个token
      // 我们的token是放到headers中的在操作headers的时候我们最好先确保修改的数据在有值的情况下去修改
      // 如果这里不确定他是否有值就去修改请求头很容易报错
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = token
      }
      return config
    }
  }
})
export default wfrequest
