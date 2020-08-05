<template>
    <div class="a-color-picker-input-part">
        <input :type="colorInfo.name === 'HEX' ? 'text' : 'number'"
            :class="['a-color-picker-input-value', colorInfo.error && 'error']"
            :value="colorInfo.value"
            @keydown.native.tab="handleTab"
            @input="handleInput">
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
                handleTab, handleInput,
            }

            function handleTab () {
                if (props.colorInfo.key === 'a') {
                    context.emit('tab')
                }
            }

            function handleInput (e) {
                const { key } = props.colorInfo
                const value = e.target.value

                context.emit('inputChange', { key, value })
            }
        },
    }
</script>
