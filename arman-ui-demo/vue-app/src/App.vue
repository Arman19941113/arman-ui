<template>
    <AIcon name="lighting" width="64" style="margin-bottom: 20px;"></AIcon>
    <div class="box-container">
        <AButton>默认主题</AButton>
        <AButton theme="primary" left-icon="setting" @click="handleClick">点击加载2s</AButton>
        <AButton theme="success" round>成功按钮</AButton>
        <AButton theme="warning" disabled>警告按钮</AButton>
        <AButton right-icon="clear" round theme="danger">右边</AButton>
    </div>
    <div class="box-container">
        <AInput v-model="inputValue"></AInput>
        <AInput v-model="inputValue" disabled placeholder="禁用"></AInput>
        <AInput v-model="inputValue" right-icon="search" round placeholder="圆角"></AInput>
    </div>
    <div class="box-container">
        <AColorPicker v-model="color" style="margin-right: 24px;" :show-value="false"></AColorPicker>
        <AColorPicker v-model="color"></AColorPicker>
    </div>
    <ALoading :value="isLoading" global></ALoading>
</template>

<script>
    import { ref } from 'vue'

    export default {
        setup () {
            const isLoading = ref(false)
            return {
                inputValue: ref(''),
                color: ref(''),
                isLoading,
                handleClick () {
                    isLoading.value = true
                    setTimeout(() => {
                        isLoading.value = false
                    }, 2000)
                }
            }
        },
    }
</script>

<style>
    @import "~@/css/reset.css";
    @import "~@/css/variable.css";
    #app {
        display: flex;
        align-items: center;
        flex-flow: column;
        height: 100vh;
        padding: 100px;
        color: $fontColorNormal;
        background: $whiteColor;
        .box-container {
            margin-bottom: 24px;
            button {
                margin-right: 24px;
            }
        }
    }
</style>
