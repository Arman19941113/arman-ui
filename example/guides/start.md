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
    </head>
    <body>
        <div id="app"></div>
        <script src="https://unpkg.com/vue@3.0.0-beta.14/dist/vue.global.prod.js"></script>
        <script>
            const App = {
                template: `
                    <div style="display: flex;flex-flow: column;justify-content: space-around;align-items: center;height: 200px;">
                        <AIcon name="lighting" width="64" style="margin-top: 20px;"></AIcon>
                        <div style="display: flex;justify-content: center">
                            <AButton style="margin-right: 40px;">你好</AButton>
                            <AButton theme="primary">世界</AButton>
                        </div>
                    </div>
                `,
            }
            const appInstance = Vue.createApp(App)
            window.appInstance = appInstance
        </script>
        <script src="https://unpkg.com/arman-ui/dist/arman-ui.iife.min.js"></script>
        <script>
            appInstance.mount('#app')
        </script>
    </body>
</html>
```
