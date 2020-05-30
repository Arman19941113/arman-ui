import { App, Plugin } from 'vue'
import AIcon from './components/icon'
import AButton from './components/button'
import ALoading from './components/loading'

const components = { AIcon, AButton, ALoading }

const plugin: Plugin = {
    install (app, ...options) {
        for (const [key, value] of Object.entries(components)) {
            app.component(key, value)
        }
    },
}

declare var app: App
if (app) {
    app.use(plugin)
}
