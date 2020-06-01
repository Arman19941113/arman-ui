<script>
    import { ref } from 'vue';
    import AInput from '@/components/input';

    export default {
        components: { AInput },
        setup () {
            return {
                inputValue: ref(''),
            }
        },
    }
</script>

# Input 输入框

## 基本使用

<div style="display: flex;flex-flow: column;justify-content: space-between;height: 164px;">
    <AInput v-model="inputValue"></AInput>
    <AInput v-model="inputValue" disabled placeholder="禁用"></AInput>
    <AInput v-model="inputValue" right-icon="search" placeholder="图标"></AInput>
    <AInput v-model="inputValue" right-icon="search" round placeholder="圆角"></AInput>
</div>


```html
<template>
    <div style="display: flex;flex-flow: column;justify-content: space-between;height: 164px;">
        <AInput v-model="inputValue"></AInput>
        <AInput v-model="inputValue" disabled placeholder="禁用"></AInput>
        <AInput v-model="inputValue" right-icon="search" placeholder="图标"></AInput>
        <AInput v-model="inputValue" right-icon="search" round placeholder="圆角"></AInput>
    </div>
</template>

<script>
    import { ref } from 'vue';

    export default {
        setup () {
            return {
                inputValue: ref(''),
            }
        },
    }
</script>
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 输入值 | String  | - | '' |
| placeholder | 占位文本 | String  | - | '' |
| rightIcon | 右侧图标 | String | [icons](icon) | '' |
| disabled | 是否禁用 | Boolean | [true, false] | false |
| round | 开启圆角 | Boolean | [true, false] | false |
