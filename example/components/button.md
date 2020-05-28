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
    <a-button>默认主题</a-button>
    <a-button theme="primary">主要按钮</a-button>
    <a-button theme="success">成功按钮</a-button>
    <a-button theme="warning">警告按钮</a-button>
    <a-button theme="danger">危险按钮</a-button>
</div>

<div class="markdown-button-container">
    <a-button :loading="isLoading" loadingText="加载中" @click="isLoading = !isLoading">点击加载</a-button>
    <a-button theme="primary" :loading="isLoading" @click="isLoading = !isLoading">主要按钮</a-button>
    <a-button theme="success" :loading="isLoading" @click="isLoading = !isLoading">成功按钮</a-button>
    <a-button theme="warning" :loading="isLoading" @click="isLoading = !isLoading">警告按钮</a-button>
    <a-button theme="danger" :loading="isLoading" @click="isLoading = !isLoading">危险按钮</a-button>
</div>

<div class="markdown-button-container">
    <a-button disabled>禁用状态</a-button>
    <a-button theme="primary" disabled>主要按钮</a-button>
    <a-button theme="success" disabled>成功按钮</a-button>
    <a-button theme="warning" disabled>警告按钮</a-button>
    <a-button theme="danger" disabled>危险按钮</a-button>
</div>

<div class="markdown-button-container">
    <a-button round>圆角按钮</a-button>
    <a-button theme="primary" round>主要按钮</a-button>
    <a-button theme="success" round>成功按钮</a-button>
    <a-button theme="warning" round>警告按钮</a-button>
    <a-button theme="danger" round>危险按钮</a-button>
</div>

<div class="markdown-button-container">
    <a-button icon="setting"></a-button>
    <a-button icon="setting">左边</a-button>
    <a-button icon-right="setting" theme="primary">右边</a-button>
    <a-button icon="setting" round theme="success"></a-button>
    <a-button icon="setting" round theme="warning">左边</a-button>
    <a-button icon-right="setting" round theme="danger">右边</a-button>
</div>

```html
<template>
    <div class="markdown-button-container">
        <a-button>默认主题</a-button>
        <a-button theme="primary">主要按钮</a-button>
        <a-button theme="success">成功按钮</a-button>
        <a-button theme="warning">警告按钮</a-button>
        <a-button theme="danger">危险按钮</a-button>
    </div>
    
    <div class="markdown-button-container">
        <a-button :loading="isLoading" loadingText="加载中" @click="isLoading = !isLoading">点击加载</a-button>
        <a-button theme="primary" :loading="isLoading" @click="isLoading = !isLoading">主要按钮</a-button>
        <a-button theme="success" :loading="isLoading" @click="isLoading = !isLoading">成功按钮</a-button>
        <a-button theme="warning" :loading="isLoading" @click="isLoading = !isLoading">警告按钮</a-button>
        <a-button theme="danger" :loading="isLoading" @click="isLoading = !isLoading">危险按钮</a-button>
    </div>
    
    <div class="markdown-button-container">
        <a-button disabled>禁用状态</a-button>
        <a-button theme="primary" disabled>主要按钮</a-button>
        <a-button theme="success" disabled>成功按钮</a-button>
        <a-button theme="warning" disabled>警告按钮</a-button>
        <a-button theme="danger" disabled>危险按钮</a-button>
    </div>
    
    <div class="markdown-button-container">
        <a-button round>圆角按钮</a-button>
        <a-button theme="primary" round>主要按钮</a-button>
        <a-button theme="success" round>成功按钮</a-button>
        <a-button theme="warning" round>警告按钮</a-button>
        <a-button theme="danger" round>危险按钮</a-button>
    </div>
    
    <div class="markdown-button-container">
        <a-button icon="setting"></a-button>
        <a-button icon="setting">左边</a-button>
        <a-button icon-right="setting" theme="primary">右边</a-button>
        <a-button icon="setting" round theme="success"></a-button>
        <a-button icon="setting" round theme="warning">左边</a-button>
        <a-button icon-right="setting" round theme="danger">右边</a-button>
    </div>
</template>
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| theme | 主题 | String  | ['default', 'primary', 'success', 'warning', 'danger'] | 'default' |
| icon | 按钮左侧图标 | [String] | [icons](icon) | '' |
| iconRight | 按钮右侧图标 | [String] | [icons](icon) | '' |
| loading | 加载中 | Boolean | [true, false] | false |
| loadingText | 加载时显示文字 | String | - | '' |
| round | 圆角按钮 | Boolean | [true, false] | false |
| disable | 是否禁用 | Boolean | [true, false] | false |
