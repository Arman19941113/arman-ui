<template>
    <div class="a-color-picker-input-part">
        <input :type="colorInfo.name === 'HEX' ? 'text' : 'number'"
            :class="['a-color-picker-input-value', colorInfo.error && 'error']"
            :value="colorInfo.value"
            @keydown.native.tab="handleTab"
            @change="handleChange">
        <span class="a-color-picker-input-text">{{colorInfo.name}}</span>
    </div>
</template>

<script>
    export default {
        name: 'InputContainer',
        props: {
            colorInfo: {
                type: Object,
                required: true,
            },
        },
        setup (props, context) {
            return {
                handleTab, handleChange,
            }

            function handleTab () {
                if (props.colorInfo.key === 'a') {
                    context.emit('tab')
                }
            }

            function handleChange (e) {
                const { key } = props.colorInfo
                const value = e.target.value

                context.emit('inputChange', { key, value })
            }
        },
    }
</script>
