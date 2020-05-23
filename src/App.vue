<template>
    <AppHeader />
    <router-view />
</template>

<script lang="ts">
    import AppHeader from '@/views/AppHeader.vue'

    export default {
        name: 'App',
        components: {
            AppHeader,
        },
    }
</script>

<style>
    @import "~@/css/reset.css";
    @import "~@/css/variable.css";
    #app {
        display: flex;
        flex-flow: column;
        height: 100vh;
        padding-top: 64px;
        overflow: auto;
        font-size: 16px;
        color: $fontColorMain;
        background: $backgroundColor;
        .app-main {
            display: flex;
            height: 100%;
            .app-content {
                height: 100%;
                width: calc(100% - 256px);
                padding: 20px 40px 40px;
            }
        }
    }
</style>
