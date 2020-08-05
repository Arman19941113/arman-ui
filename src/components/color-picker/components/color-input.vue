<template>
    <div class="a-color-picker-input">
        <div class="a-color-picker-input-hex">
            <InputContainer :color-info="colorState.hex" @inputChange="handleInput"></InputContainer>
        </div>
        <div class="a-color-picker-input-rgba">
            <InputContainer :color-info="colorState.r" @inputChange="handleInput"></InputContainer>
            <InputContainer :color-info="colorState.g" @inputChange="handleInput"></InputContainer>
            <InputContainer :color-info="colorState.b" @inputChange="handleInput"></InputContainer>
            <InputContainer :color-info="colorState.a" @inputChange="handleInput" @tab="$emit('tab')"></InputContainer>
        </div>
    </div>
</template>

<script>
    import { reactive, watch } from 'vue'
    import InputContainer from './input-container.vue'
    import tinycolor from 'tinycolor2'

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
                r: { key: 'r', name: 'R', value: props.colorObj.rgba.r.toString(), error: false },
                g: { key: 'g', name: 'G', value: props.colorObj.rgba.g.toString(), error: false },
                b: { key: 'b', name: 'B', value: props.colorObj.rgba.b.toString(), error: false },
                a: { key: 'a', name: 'Alpha', value: props.colorObj.rgba.a.toString(), error: false },
            })

            watch(() => props.colorObj, val => {
                if (tinycolor(val.hex).toString() !== tinycolor(colorState.hex.value).toString()) {
                    // 只有 hex 代表的颜色不同才同步，像这种手动输入了 #fEF 等价于 #ffeeff 就不同步
                    colorState.hex.value = val.hex
                }
                colorState.r.value = val.rgba.r.toString()
                colorState.g.value = val.rgba.g.toString()
                colorState.b.value = val.rgba.b.toString()
                colorState.a.value = val.rgba.a.toString()
                validate(colorState)
            })

            return {
                colorState,
                handleInput,
            }

            // 处理手动输入颜色
            function handleInput ({ key, value }) {
                colorState[key].value = value

                if (validate(colorState)) {
                    const colorStr = key === 'hex'
                        ? colorState.hex.value
                        : `rgba(${colorState.r.value}, ${colorState.g.value}, ${colorState.b.value}, ${colorState.a.value})`
                    context.emit('colorChange', colorStr)
                }
            }

            // 根据输入的表单判断输入值是否合法
            function validate (colorState) {
                let result = true
                const { hex, r, g, b, a } = colorState
                // hex
                if (hex.value.startsWith('#')
                    && (hex.value.length === 4 || hex.value.length === 7)
                    && !hex.value.slice(1).match(/[^0-9a-fA-F]/)) {
                    hex.error = false
                } else {
                    hex.error = true
                    result = false
                }
                // a
                if (a.value !== '' && a.value >= 0 && a.value <= 1) {
                    a.error = false
                } else {
                    a.error = true
                    result = false
                }
                // r g b
                for (const colorInfo of [r, g, b]) {
                    const { value } = colorInfo
                    if (value !== '' && value >= 0 && value <= 255) {
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
