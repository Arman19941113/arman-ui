<template>
    <div :class="['a-input', rightIcon && 'has-right-icon']">
        <input type="text"
            :class="['a-input-box', round && 'round']"
            :value="modelValue"
            :disabled="disabled"
            :placeholder="placeholder"
            @blur="$emit('blur', $event)"
            @focus="$emit('focus', $event)"
            @input="$emit('update:modelValue', $event.target.value)">
        <AIcon v-if="rightIcon" :name="rightIcon" width="16" class="right-icon"></AIcon>
    </div>
</template>

<script>
    import AIcon from 'arman-ui/lib/icon'

    export default {
        components: {
            AIcon,
        },
        props: {
            modelValue: {
                type: String,
                default: '',
            },
            placeholder: {
                type: String,
                default: '请输入',
            },
            rightIcon: {
                type: String,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            round: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>

<style>
    @import "./input.css";
</style>
