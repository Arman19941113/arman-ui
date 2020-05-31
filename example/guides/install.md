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
import { Icon, Button, Loading } from 'arman-ui'

app.component(Icon.name, Icon)
app.component(Button.name, Button)
app.component(Loading.name, Loading)
```
