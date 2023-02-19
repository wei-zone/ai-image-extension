import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { log } from '@/libs/utils'

console.log(import.meta.env)
// @ts-ignore
console.log(process.env)
log.capsule('Environment', `${import.meta.env.MODE}`, 'primary')
// @ts-ignore
log.capsule('Version', `${process.env.APP_VERSION}`, 'primary')
// @ts-ignore
log.capsule('BuildTime', `${process.env.APP_BUILD_TIME}`, 'primary')

const app = createApp(App)

app.use(createPinia()).use(router).use(ElementPlus).mount('#app')
