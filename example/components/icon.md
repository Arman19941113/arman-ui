<script>
    import AIcon from '@/components/icon';
    
    export default {
        components: { AIcon },
    };
</script>

# Icon 图标

## 基本使用

<AIcon name="setting" width="24" style="margin: 0 16px"></AIcon>
<AIcon name="love" width="24" color="#F78989" style="margin: 0 16px"></AIcon>

```html
<template>
    <AIcon name="setting" width="24" style="margin: 0 16px"></AIcon>
    <AIcon name="love" width="24" color="#F78989" style="margin: 0 16px"></AIcon>
</template>
```

## 图标集合

<AIcon name="setting" width="24" style="margin: 0 16px"></AIcon>
<AIcon name="love" width="24" style="margin: 0 16px"></AIcon>
<AIcon name="edit" width="24" style="margin: 0 16px"></AIcon>
<AIcon name="clear" width="24" style="margin: 0 16px"></AIcon>
<AIcon name="play" width="24" style="margin: 0 16px"></AIcon>
<AIcon name="search" width="24" style="margin: 0 16px"></AIcon>
<AIcon name="download" width="24" style="margin: 0 16px"></AIcon>

```html
<template>
    <AIcon name="setting" width="24" style="margin: 0 16px"></AIcon>
    <AIcon name="love" width="24" style="margin: 0 16px"></AIcon>
    <AIcon name="edit" width="24" style="margin: 0 16px"></AIcon>
    <AIcon name="clear" width="24" style="margin: 0 16px"></AIcon>
    <AIcon name="play" width="24" style="margin: 0 16px"></AIcon>
    <AIcon name="search" width="24" style="margin: 0 16px"></AIcon>
    <AIcon name="download" width="24" style="margin: 0 16px"></AIcon>
</template>
```

## 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| name | 显示的数字 | String  | — |
| width | 图标大小 | [Number, String] | 16 |
| color | 图标颜色 | String | '' |
