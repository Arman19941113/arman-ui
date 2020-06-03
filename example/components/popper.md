<script>
    import { ref } from 'vue';
    import AInput from '@/components/input';
    import APopper from '@/components/popper';
    
    export default {
        components: { AInput, APopper },
        setup () {
            return {
                reference: ref(null),
                inputValue: ref(''),
                showPopper: ref(false),
            }
        },
    };
</script>

# Popper 浮层

## 基本使用

<div>
    <AInput ref="reference" round placeholder="focus 出现浮层" v-model="inputValue" @focus="showPopper = true" @blur="showPopper = false"></AInput>
    <APopper :value="showPopper" :reference="reference">
        <div style="width: 240px;height: 100px;padding: 16px;border: 1px solid #DCDFE6;border-radius: 2px;background-color: #FFF;">
            表单输入值：{{inputValue}}
        </div>
    </APopper>
</div>

```html
<template>
    <AInput ref="reference" round placeholder="focus 出现浮层" v-model="inputValue" @focus="showPopper = true" @blur="showPopper = false"></AInput>
    <APopper :value="showPopper" :reference="reference">
        <div style="width: 240px;height: 100px;padding: 16px;border: 1px solid #DCDFE6;border-radius: 2px;background-color: #FFF;">
            表单输入值：{{inputValue}}
        </div>
    </APopper>
</template>

<script>
    import { ref } from 'vue';
    import AInput from '@/components/input';
    import APopper from '@/components/popper';
    
    export default {
        components: { AInput, APopper },
        setup () {
            return {
                reference: ref(null),
                inputValue: ref(''),
                showPopper: ref(false),
            }
        },
    };
</script>
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 是否显示的绑定值 | Boolean  | [true, false] | false |
| reference | reference Dom | Object | - | - |
