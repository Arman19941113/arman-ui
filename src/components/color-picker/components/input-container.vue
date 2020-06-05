<template>
    <div class="a-color-picker-input-part">
        <input :type="info.name === 'HEX' ? 'text' : 'number'"
            :class="['a-color-picker-input-value', info.error && 'error']"
            :value="info.value"
            @change="handleChange">
        <span class="a-color-picker-input-text">{{info.name}}</span>
    </div>
</template>

<script>
    export default {
        name: 'InputContainer',
        props: {
            info: {
                type: Object,
                required: true,
            },
        },
        setup (props, context) {
            return {
                handleChange (e) {
                    const { key } = props.info
                    const value = e.target.value

                    context.emit('change', key, value)
                },
            }
        }
    }
</script>
