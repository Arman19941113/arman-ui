<script>
    import { ref } from 'vue';
    import AButton from '@/components/button';
    
    export default {
        components: { AButton },
        setup () {
            const isLoading = ref(false);
            
            return {
                isLoading,
            }
        },
    };
</script>

# Button 按钮

## 基本使用

<div class="markdown-button-container">
    <AButton>默认主题</AButton>
    <AButton theme="primary">主要按钮</AButton>
    <AButton theme="success">成功按钮</AButton>
    <AButton theme="warning">警告按钮</AButton>
    <AButton theme="danger">危险按钮</AButton>
</div>

<div class="markdown-button-container">
    <AButton :loading="isLoading" loadingText="加载中" @click="isLoading = !isLoading">点击加载</AButton>
    <AButton theme="primary" :loading="isLoading" @click="isLoading = !isLoading">主要按钮</AButton>
    <AButton theme="success" :loading="isLoading" @click="isLoading = !isLoading">成功按钮</AButton>
    <AButton theme="warning" :loading="isLoading" @click="isLoading = !isLoading">警告按钮</AButton>
    <AButton theme="danger" :loading="isLoading" @click="isLoading = !isLoading">危险按钮</AButton>
</div>

<div class="markdown-button-container">
    <AButton disabled>禁用状态</AButton>
    <AButton theme="primary" disabled>主要按钮</AButton>
    <AButton theme="success" disabled>成功按钮</AButton>
    <AButton theme="warning" disabled>警告按钮</AButton>
    <AButton theme="danger" disabled>危险按钮</AButton>
</div>

<div class="markdown-button-container">
    <AButton round>圆角按钮</AButton>
    <AButton theme="primary" round>主要按钮</AButton>
    <AButton theme="success" round>成功按钮</AButton>
    <AButton theme="warning" round>警告按钮</AButton>
    <AButton theme="danger" round>危险按钮</AButton>
</div>

<div class="markdown-button-container">
    <AButton left-icon="setting"></AButton>
    <AButton left-icon="setting">左边</AButton>
    <AButton right-icon="setting" theme="primary">右边</AButton>
    <AButton left-icon="setting" round theme="success"></AButton>
    <AButton left-icon="setting" round theme="warning">左边</AButton>
    <AButton right-icon="setting" round theme="danger">右边</AButton>
</div>

```html
<template>
    <div class="markdown-button-container">
        <AButton>默认主题</AButton>
        <AButton theme="primary">主要按钮</AButton>
        <AButton theme="success">成功按钮</AButton>
        <AButton theme="warning">警告按钮</AButton>
        <AButton theme="danger">危险按钮</AButton>
    </div>
    
    <div class="markdown-button-container">
        <AButton :loading="isLoading" loadingText="加载中" @click="isLoading = !isLoading">点击加载</AButton>
        <AButton theme="primary" :loading="isLoading" @click="isLoading = !isLoading">主要按钮</AButton>
        <AButton theme="success" :loading="isLoading" @click="isLoading = !isLoading">成功按钮</AButton>
        <AButton theme="warning" :loading="isLoading" @click="isLoading = !isLoading">警告按钮</AButton>
        <AButton theme="danger" :loading="isLoading" @click="isLoading = !isLoading">危险按钮</AButton>
    </div>
    
    <div class="markdown-button-container">
        <AButton disabled>禁用状态</AButton>
        <AButton theme="primary" disabled>主要按钮</AButton>
        <AButton theme="success" disabled>成功按钮</AButton>
        <AButton theme="warning" disabled>警告按钮</AButton>
        <AButton theme="danger" disabled>危险按钮</AButton>
    </div>
    
    <div class="markdown-button-container">
        <AButton round>圆角按钮</AButton>
        <AButton theme="primary" round>主要按钮</AButton>
        <AButton theme="success" round>成功按钮</AButton>
        <AButton theme="warning" round>警告按钮</AButton>
        <AButton theme="danger" round>危险按钮</AButton>
    </div>
    
    <div class="markdown-button-container">
        <AButton left-icon="setting"></AButton>
        <AButton left-icon="setting">左边</AButton>
        <AButton right-icon="setting" theme="primary">右边</AButton>
        <AButton left-icon="setting" round theme="success"></AButton>
        <AButton left-icon="setting" round theme="warning">左边</AButton>
        <AButton right-icon="setting" round theme="danger">右边</AButton>
    </div>
</template>
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| theme | 主题 | String  | ['default', 'primary', 'success', 'warning', 'danger'] | 'default' |
| leftIcon | 按钮左侧图标 | String | [icons](icon) | '' |
| rightIcon | 按钮右侧图标 | String | [icons](icon) | '' |
| loading | 加载中 | Boolean | [true, false] | false |
| loadingText | 加载时显示文字 | String | - | '' |
| round | 圆角按钮 | Boolean | [true, false] | false |
| disable | 是否禁用 | Boolean | [true, false] | false |
