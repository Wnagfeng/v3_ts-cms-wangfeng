// 创建一个枚举类型
enum CacheType {
  Local,
  Session
}
/** This Web Storage API interface provides access to a particular domain's session or local storage. It allows, for example, the addition, modification, or deletion of stored data items. */
// 创建一个类
class useCache {
  storage: Storage
  // new的时候给我传递一个类型过来
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }
  // 如果是一个对象我们就转换一下设置进去
  // 如果是一个字符串也没有问题
  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}
const localCache = new useCache(CacheType.Local)
const sessionCache = new useCache(CacheType.Session)
export { localCache, sessionCache }
