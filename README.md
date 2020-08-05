# 快速开始

## CDN

在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/arman-ui/dist/arman-ui.min.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/arman-ui/dist/arman-ui.iife.min.js"></script>
```

## Hello World

通过引用上述文件，可以很容易写出一个 Hello World 页面。

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="https://unpkg.com/arman-ui/dist/arman-ui.min.css">
        <style>*{box-sizing: border-box;outline: none;}</style>
    </head>
    <body>
        <div id="app" style="display: flex;flex-flow: column;justify-content: space-around;align-items: center;height: 200px;"></div>
        <script src="https://unpkg.com/vue@3.0.0-beta.14/dist/vue.global.prod.js"></script>
        <script src="https://unpkg.com/arman-ui/dist/arman-ui.iife.min.js"></script>
        <script>
            window.process = { env: { NODE_ENV: "development" } }
            const App = {
                template: `
                    <AIcon name="lighting" width="64" style="margin-top: 20px;"></AIcon>
                    <AColorPicker v-model="color"></AColorPicker>
                    <div style="display: flex;justify-content: center">
                        <AButton :style="{ 'margin-right': '40px', color }" @click="count--">你好</AButton>
                        <AInput v-model="count" style="margin-right: 40px;"></AInput>
                        <AButton theme="primary" @click="count++">世界</AButton>
                    </div>
                `,
                setup () {
                    return {
                        color: Vue.ref('#666'),
                        count: Vue.ref(0),
                    }
                }
            }
            const app = Vue.createApp(App)
            app.use(ArmanUI)
            app.mount('#app')
        </script>
    </body>
</html>
```

# 引入组件库

## npm 安装

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```
npm install arman-ui
```

## 完整引入

在入口文件 main.js 中引入：

```javascript
import 'arman-ui/dist/arman-ui.css'
import { createApp } from 'vue'
import App from './App.vue'
import ArmanUi from 'arman-ui'

const app = createApp(App)
app.use(ArmanUi)

app.mount('#app')
```

## 按需引入

借助 [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的:

```
npm install babel-plugin-component -D
```

然后修改 babel 配置，在 plugins 里面引入 babel-plugin-component：

```
plugins: [
    ["component", { "libraryName": "arman-ui" }]
]
```

接下来，如果你只希望引入部分组件，比如 Icon 和 Button，那么需要在 main.js 中写入以下内容：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { Icon, Button  } from 'arman-ui'

const app = createApp(App)
app.component(Icon.name, Icon)
app.component(Button.name, Button)

app.mount('#app')
```

## 完整组件列表

如果引入了组件没有注册，该组件不会出现在打包文件中

```javascript
import {
    Icon, Button,
    Loading, Popper,
    Input, ColorPicker
} from 'arman-ui'

app.component(Icon.name, Icon)
app.component(Button.name, Button)
app.component(Loading.name, Loading)
app.component(Popper.name, Popper)
app.component(Input.name, Input)
app.component(ColorPicker.name, ColorPicker)
```
