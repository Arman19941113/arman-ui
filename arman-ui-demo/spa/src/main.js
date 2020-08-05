import { createApp } from 'vue'
import App from './App'
import { Icon, Input, Button, } from 'arman-ui'

const app = createApp(App)
app.component(Icon.name, Icon)
app.component(Input.name, Input)
app.component(Button.name, Button)

app.mount('#app')
