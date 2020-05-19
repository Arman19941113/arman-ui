<template>
    <Header />
    <main class="main-container">
        <router-view />
    </main>
</template>

<script lang="ts">
    import Header from '@/components/Header.vue'

    export default {
        name: 'App',
        components: {
            Header
        }
    }
</script>

<style>
    @import "~@/css/reset.css";
    @import "~@/css/variable.css";
    #app {
        height: 100vh;
        font-size: 18px;
        color: $fontColor;
        background: $backgroundColor;
        .main-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 400px;
        }
    }
</style>
