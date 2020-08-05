<template>
    <AIcon name="lighting" width="64" style="margin-top: 20px;"></AIcon>
    <div style="display: flex;justify-content: center">
        <AButton style="margin-right: 40px;" @click="count--">你好</AButton>
        <AInput v-model="count" style="margin-right: 40px;"></AInput>
        <AButton theme="primary" @click="count++">世界</AButton>
    </div>
</template>

<script>
    import { ref } from 'vue'

    export default {
        setup () {
            return {
                count: ref(0),
            }
        },
    }
</script>

<style>
    @import "~@/css/reset.css";
    #app {
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        align-items: center;
        height: 200px;
    }
</style>
