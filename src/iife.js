import AIcon from './components/icon'
import AButton from './components/button'
import ALoading from './components/loading'
import APopper from './components/popper'
import AColorPicker from './components/color-picker'

const components = { AIcon, AButton, ALoading, APopper, AColorPicker }

const plugin = {
    install (app, ...options) {
        for (const [key, value] of Object.entries(components)) {
            app.component(key, value)
        }
    },
}

if (appInstance) {
    appInstance.use(plugin)
}
