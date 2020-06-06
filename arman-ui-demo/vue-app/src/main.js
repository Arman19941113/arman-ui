import { createApp } from 'vue'
import App from './App'
import {
    Icon, Button,
    Loading, Popper,
    Input, ColorPicker,
} from 'arman-ui'

const app = createApp(App)
app.component(Icon.name, Icon)
app.component(Button.name, Button)
app.component(Loading.name, Loading)
app.component(Popper.name, Popper)
app.component(Input.name, Input)
app.component(ColorPicker.name, ColorPicker)

app.mount('#app')
