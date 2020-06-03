<script>
    import { ref } from 'vue';
    import AButton from '@/components/button';
    import ALoading from '@/components/loading';
    
    export default {
        components: { AButton, ALoading },
        setup () {
            const isLoading = ref(false);
            const isLoading1 = ref(false);
            const isLoading2 = ref(false);
            const isLoading3 = ref(false);
            
            return {
                isLoading,
                isLoading1,
                isLoading2,
                isLoading3,
                handle,
                handle1,
                handle2,
                handle3,
            }
        },
    };
    
    function handle () {
         this.isLoading = !this.isLoading;
         setTimeout(()=>{this.isLoading = false}, 2000)
    }
    function handle1 () {
         this.isLoading1 = !this.isLoading1;
         setTimeout(()=>{this.isLoading1 = false}, 2000)
    }
    function handle2 () {
         this.isLoading2 = !this.isLoading2;
         setTimeout(()=>{this.isLoading2 = false}, 2000)
    }
    function handle3 () {
         this.isLoading3 = !this.isLoading3;
         setTimeout(()=>{this.isLoading3 = false}, 2000)
    }
</script>

# Loading 加载中

## 基本使用
<div style="width: 500px;height: 120px;display: flex;justify-content: space-around;align-items: center;border: 1px solid #DCDFE6;">
    <a-button @click="handle">整页加载</a-button>
    <a-button @click="handle1">普通圆弧</a-button>
    <a-button @click="handle2">扩散圆圈</a-button>
    <a-button @click="handle3">四点旋转</a-button>
    <a-loading :value="isLoading" global></a-loading>
    <a-loading :value="isLoading1" type="linear"></a-loading>
    <a-loading :value="isLoading2" type="wave"></a-loading>
    <a-loading :value="isLoading3" type="dots"></a-loading>
</div>

```html
<template>
    <div style="width: 500px;height: 120px;display: flex;justify-content: space-around;align-items: center;border: 1px solid #DCDFE6;">
        <a-button @click="handle">整页加载</a-button>
        <a-button @click="handle1">普通圆弧</a-button>
        <a-button @click="handle2">扩散圆圈</a-button>
        <a-button @click="handle3">四点旋转</a-button>
        <a-loading :value="isLoading" global></a-loading>
        <a-loading :value="isLoading1" type="linear"></a-loading>
        <a-loading :value="isLoading2" type="wave"></a-loading>
        <a-loading :value="isLoading3" type="dots"></a-loading>
    </div>
</template>
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 是否显示的绑定值 | Boolean  | [true, false] | false |
| type | 加载图标类型 | String | ['default', 'linear', 'wave', 'dots'] | 'default' |
| width | 加载图标大小 | [Number, String] | - | 40 |
| global | 是否整页加载 | Boolean | [true, false] | false |
| index | 样式层级 | String | - | '2000' |
| background | 遮罩层背景 | String | - | 'rgba(255, 255, 255, .8)' |
| text | 加载文字 | String | - | '' |
