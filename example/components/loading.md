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

            function handle () {
                 isLoading.value = !isLoading.value;
                 setTimeout(()=>{isLoading.value = false}, 2000)
            }
            function handle1 () {
                 isLoading1.value = !isLoading1.value;
                 setTimeout(()=>{isLoading1.value = false}, 2000)
            }
            function handle2 () {
                 isLoading2.value = !isLoading2.value;
                 setTimeout(()=>{isLoading2.value = false}, 2000)
            }
            function handle3 () {
                 isLoading3.value = !isLoading3.value;
                 setTimeout(()=>{isLoading3.value = false}, 2000)
            }
        },
    };
</script>

# Loading 加载中

## 基本使用
<div style="width: 500px;height: 120px;display: flex;justify-content: space-around;align-items: center;border: 1px solid #DCDFE6;">
    <AButton @click="handle">整页加载</AButton>
    <AButton @click="handle1">普通圆弧</AButton>
    <AButton @click="handle2">扩散圆圈</AButton>
    <AButton @click="handle3">四点旋转</AButton>
    <ALoading :value="isLoading" global></ALoading>
    <ALoading :value="isLoading1" type="linear"></ALoading>
    <ALoading :value="isLoading2" type="wave"></ALoading>
    <ALoading :value="isLoading3" type="dots"></ALoading>
</div>

```html
<template>
    <div style="width: 500px;height: 120px;display: flex;justify-content: space-around;align-items: center;border: 1px solid #DCDFE6;">
        <AButton @click="handle">整页加载</AButton>
        <AButton @click="handle1">普通圆弧</AButton>
        <AButton @click="handle2">扩散圆圈</AButton>
        <AButton @click="handle3">四点旋转</AButton>
        <ALoading :value="isLoading" global></ALoading>
        <ALoading :value="isLoading1" type="linear"></ALoading>
        <ALoading :value="isLoading2" type="wave"></ALoading>
        <ALoading :value="isLoading3" type="dots"></ALoading>
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
| background | 遮罩层背景 | String | - | 'rgba(255, 255, 255, .8)' |
| text | 加载文字 | String | - | '' |
