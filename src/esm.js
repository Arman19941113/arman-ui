import AIcon from './components/icon'
import AButton from './components/button'
import ALoading from './components/loading'

const components = { AIcon, AButton, ALoading }

const plugin = {
    install (app, ...options) {
        for (const [key, value] of Object.entries(components)) {
            app.component(key, value)
        }
    },
}

export default {
    install: plugin.install,
    ...components,
}
