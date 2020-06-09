<script>
    import { ref } from 'vue';
    import AColorPicker from '@/components/color-picker';

    export default {
        components: { AColorPicker },
        setup () {
            return {
                color1: ref(''),
                color2: ref('#409EFF'),
                color3: ref('#409EFF'),
                recommendColors: ref(['#000', '#333', '#666', '#999', 'FFF']),
                handleChange (val) {
                    console.log(val)
                },
            }
        },
    }
</script>

# ColorPicker 颜色选择器

用于颜色选择，支持多种颜色格式，支持颜色预设。

## 基本使用

<AColorPicker v-model="color1" style="margin-right: 24px;" :show-value="false"></AColorPicker>
<AColorPicker v-model="color1" @update:modelValue="handleChange"></AColorPicker>

```html
<template>
    <AColorPicker v-model="color1" style="margin-right: 24px;" :show-value="false"></AColorPicker>
    <AColorPicker v-model="color1" @update:modelValue="handleChange"></AColorPicker>
</template>

<script>
    import { ref } from 'vue';
    import AColorPicker from '@/components/color-picker';

    export default {
        components: { AColorPicker },
        setup () {
            return {
                color1: ref(''),
                handleChange (val) {
                    console.log(val)
                },
            }
        },
    }
</script>
```

## 不同尺寸

###### 选择器有三种尺寸：大、默认（中）、小。

<AColorPicker v-model="color2" size="large" style="margin-right: 24px;"></AColorPicker>
<AColorPicker v-model="color2" style="margin-right: 24px;"></AColorPicker>
<AColorPicker v-model="color2" size="small"></AColorPicker>

```html
<template>
    <AColorPicker v-model="color2" size="large" style="margin-right: 24px;"></AColorPicker>
    <AColorPicker v-model="color2" style="margin-right: 24px;"></AColorPicker>
    <AColorPicker v-model="color2" size="small"></AColorPicker>
</template>

<script>
    import { ref } from 'vue';
    import AColorPicker from '@/components/color-picker';

    export default {
        components: { AColorPicker },
        setup () {
            return {
                color2: ref('#409EFF'),
            }
        },
    }
</script>
```

## 颜色预设

###### 当 recommend 属性为 true 时显示推荐的颜色预设，为 false 时关闭预设，也可传入数组自定义预设。

<AColorPicker v-model="color3" :recommend="recommendColors"></AColorPicker>

```html
<template>
    <AColorPicker v-model="color3" :recommend="recommendColors"></AColorPicker>
</template>

<script>
    import { ref } from 'vue';
    import AColorPicker from '@/components/color-picker';

    export default {
        components: { AColorPicker },
        setup () {
            return {
                color3: ref('#409EFF'),
                recommendColors: ref(['#000', '#333', '#666', '#999', 'FFF']),
            }
        },
    }
</script>
```

### 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 当前选择的RGB颜色值，支持 v-model | String | —— | #3A84FF |
| show-value | 是否显示当前选择的RGB颜色值 | Boolean | [true, false] | true |
| size | 有三种尺寸：大、默认（中）、小。 | String | ['large', '', 'small'] | '' |
| recommend | 是否显示预设值 | [Boolean, Array] | -- | true |

### 事件

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| update:modelValue | 当前选择的RGB颜色值变化时调用 | modelValue |
