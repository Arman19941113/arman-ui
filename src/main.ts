import { createApp } from 'vue'
import { router } from '@/router'
import AppHeader from '@/views/AppHeader.vue'
import SideNav from '@/views/SideNav.vue'

import App from './App.vue'

const app = createApp(App)

app.component('AppHeader', AppHeader)
app.component('SideNav', SideNav)
app.use(router)

router.isReady().then(() => app.mount('#app'))
