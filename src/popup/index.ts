import { createApp } from 'vue'
import App from './App.vue'
import './app.css'

import { log } from '@/plugin'
console.log(import.meta.env)
// @ts-ignore
console.log(process.env)
log.capsule('Environment', `${import.meta.env.MODE}`, 'primary')
// @ts-ignore
log.capsule('Version', `${process.env.APP_VERSION}`, 'primary')
// @ts-ignore
log.capsule('BuildTime', `${process.env.APP_BUILD_TIME}`, 'primary')

const app = createApp(App)
app.mount('#app')
