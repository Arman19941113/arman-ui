<template>
    <div class="a-color-picker-input">
        <div class="a-color-picker-input-hex">
            <InputContainer :color-info="colorState.hex" @inputChange="handleChange"></InputContainer>
        </div>
        <div class="a-color-picker-input-rgba">
            <InputContainer :color-info="colorState.r" @inputChange="handleChange"></InputContainer>
            <InputContainer :color-info="colorState.g" @inputChange="handleChange"></InputContainer>
            <InputContainer :color-info="colorState.b" @inputChange="handleChange"></InputContainer>
            <InputContainer :color-info="colorState.a" @inputChange="handleChange" @tab="$emit('tab')"></InputContainer>
        </div>
    </div>
</template>

<script>
    import { reactive, watch } from 'vue'
    import InputContainer from './input-container.vue'

    export default {
        name: 'ColorInput',
        components: {
            InputContainer,
        },
        props: {
            colorObj: {
                type: Object,
                required: true,
            },
        },
        setup (props, context) {
            const colorState = reactive({
                hex: { key: 'hex', name: 'HEX', value: props.colorObj.hex, error: false },
                r: { key: 'r', name: 'R', value: props.colorObj.rgba.r, error: false },
                g: { key: 'g', name: 'G', value: props.colorObj.rgba.g, error: false },
                b: { key: 'b', name: 'B', value: props.colorObj.rgba.b, error: false },
                a: { key: 'a', name: 'Alpha', value: props.colorObj.rgba.a, error: false },
            })

            watch(() => props.colorObj, val => {
                colorState.hex.value = val.rgba.a === 1 ? val.hex : ''
                colorState.r.value = val.rgba.r
                colorState.g.value = val.rgba.g
                colorState.b.value = val.rgba.b
                colorState.a.value = val.rgba.a
                validate(colorState)
            })

            return {
                colorState,
                handleChange,
            }

            // 处理手动输入颜色
            function handleChange ({ key, value }) {
                colorState[key].value = value

                if (!validate(colorState)) {
                    return
                }

                const colorStr = key === 'hex'
                    ? colorState.hex.value
                    : `rgba(${colorState.r.value}, ${colorState.g.value}, ${colorState.b.value}, ${colorState.a.value})`
                context.emit('colorChange', colorStr)
            }

            // 根据输入的表单判断输入值是否合法
            function validate (colorState) {
                let result = true
                const { hex, r, g, b, a } = colorState
                // hex
                if (hex.value === '') {
                    hex.error = false
                } else {
                    const hexCore = hex.value.slice(1)
                    const { length } = hexCore
                    if (hex.value.startsWith('#') && (length === 3 || length === 6) && !hexCore.match(/[^0-9a-fA-F]/)) {
                        hex.error = false
                    } else {
                        hex.error = true
                        result = false
                    }
                }
                // a
                if (a.value >= 0 && a.value <= 1) {
                    a.error = false
                } else {
                    a.error = true
                    result = false
                }
                // r g b
                for (const colorInfo of [r, g, b]) {
                    const { value } = colorInfo
                    if (value >= 0 && value <= 255) {
                        colorInfo.error = false
                    } else {
                        colorInfo.error = true
                        result = false
                    }
                }
                return result
            }
        },
    }
</script>
