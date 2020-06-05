<template>
    <svg class="a-icon" :style="{ 'font-size': width && width + 'px', color }">
        <use v-bind="{'xlink:href':`#icon-${name}`}"></use>
    </svg>
</template>

<script>
    import './iconfont.js'

    export default {
        name: 'AIcon',
        props: {
            name: {
                type: String,
                required: true,
            },
            width: {
                type: [Number, String],
                default: '',
            },
            color: {
                type: String,
                default: '',
            },
        },
    }
</script>

<style>
    .a-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
