import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import './assets/main.css'
import { log } from '@/libs/utils'

log.danger(import.meta.env)
log.danger(process.env)
log.capsule('Environment', `${import.meta.env.MODE}`, 'primary')
log.capsule('Version', `${process.env.APP_VERSION}`, 'primary')
log.capsule('BuildTime', `${process.env.APP_BUILD_TIME}`, 'primary')

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
