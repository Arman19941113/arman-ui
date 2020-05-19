import { createApp, Plugin } from 'vue'
import { store } from './store'
import { router } from './router'

import { createI18n } from 'vue-i18n'
import * as jsCookie from 'js-cookie'

import App from './App.vue'

const app = createApp(App)

app.use(store)
app.use(router)

const language = jsCookie.get('language')
store.commit('updateLanguage', language)
const i18n = createI18n({
    legacy: true,
    locale: language || 'zh',
    messages: {
        zh: require('./i18n/zh').default,
        en: require('./i18n/en').default
    }
})
app.use(i18n as Plugin)

router.isReady().then(() => app.mount('#app'))

if (module.hot) {
    module.hot.accept(['./i18n/zh', './i18n/en'], function () {
        i18n.setLocaleMessage('zh', require('./i18n/zh').default)
        i18n.setLocaleMessage('en', require('./i18n/en').default)
    })
}
