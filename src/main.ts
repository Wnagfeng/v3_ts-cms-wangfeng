import { createApp } from 'vue'
import 'normalize.css'
import App from './App.vue'
import router from './Router'
import pinia from './Stores'
import '@/assets/Css/index.less'
import { RegisterIcons } from '@/global/register-icons'
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(RegisterIcons)

app.mount('#app')
