import { createApp } from 'vue'
import 'normalize.css'
import App from './App.vue'
import router from './router'
import pinia from './Stores'
import '@/assets/Css/index.less'
import { RegisterIcons } from '@/global/register-icons'
import useLoginStore from './Stores/Module/login/login'
import 'default-passive-events'
const app = createApp(App)

app.use(pinia)
// 在pinia之后在router之前我们重新进行路由匹配主要是防止用户刷新防止数据丢失
const loginStore = useLoginStore()
loginStore.loadRouters()
app.use(router)
app.use(RegisterIcons)

app.mount('#app')
