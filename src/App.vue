<template>
    <AppHeader />
    <router-view />
</template>

<script lang="ts">
    export default {
        name: 'App',
    }
</script>

<style>
    @import "~@/css/reset.css";
    @import "~@/css/variable.css";
    #app {
        position: relative;
        top: 64px;
        display: flex;
        flex-flow: column;
        height: calc(100vh - 64px);
        font-size: 16px;
        color: $fontColorNormal;
        background: $whiteColor;
        .app-main {
            display: flex;
            height: 100%;
            .app-content {
                padding: 20px 40px 40px;
                width: calc(100% - 256px);
                height: 100%;
                overflow: auto;
                &::-webkit-scrollbar {
                    width: 8px;
                }
                &::-webkit-scrollbar-thumb {
                    border-radius: 4px;
                    background-color: $borderColor;
                }
            }
        }
    }
</style>
