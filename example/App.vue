<template>
    <AppHeader />
    <router-view />
</template>

<script>
    import AppHeader from './views/AppHeader.vue'

    export default {
        name: 'App',
        components: { AppHeader },
    }
</script>

<style>
    @import "~@/css/variable.css";
    @import "~@/css/scroller.css";
    #app {
        position: relative;
        top: 64px;
        display: flex;
        flex-flow: column;
        height: calc(100vh - 64px);
        color: $fontColorNormal;
        background: $whiteColor;
        .app-main {
            display: flex;
            min-width: 1000px;
            height: 100%;
            min-height: 600px;
            .app-content {
                padding: 20px 40px 40px;
                width: calc(100% - 256px);
                height: 100%;
                overflow: auto;
                @mixin scroller;
                /* markdown 渲染样式 */
                h1 {font-size: 1.3em;padding-bottom: 0.2em;border-bottom: 1px solid $borderColorLight;}
                h2 {font-size: 1.2em;}
                h3 {font-size: 1.1em;}
                a {color: $primaryColor;text-decoration: underline;}
                code[v-pre] {
                    display: block;
                    line-height: 1.5;
                    font-family: Menlo, Monaco, Consolas, Courier, monospace;
                    font-size: 12px;
                    padding: 12px 16px;
                    border-radius: 4px;
                    border: 1px solid $borderColorNormal;
                    background-color: $lightGrayColor;
                }
                pre .hljs-tag {
                    white-space: pre-wrap;
                }
                table {
                    margin-bottom: 24px;
                    width: 100%;
                    border: 1px solid $borderColorNormal;
                    border-collapse: collapse;
                    border-spacing: 0;
                    empty-cells: show;
                    font-size: 12px;
                    font-family: Consolas, Menlo, Courier, monospace;
                    th, td {
                        padding: 8px 16px;
                        border: 1px solid $borderColorNormal;
                    }
                    th {
                        text-align: left;
                        background-color: $lightGrayColor;
                    }
                }
                .markdown-button-container {
                    margin-bottom: 24px;
                    button {
                        margin-right: 24px;
                    }
                }
            }
        }
    }

    * {
        box-sizing: border-box;
        outline: none;
    }

    html,
    body {
        margin: 0;
        padding: 0;
    }

    ul,
    li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    dl,
    dt,
    dd,
    p {
        margin: 0;
        padding: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    td,
    th {
        padding: 0;
    }
</style>
