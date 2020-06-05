<template>
    <div class="a-color-picker-input">
        <div class="a-color-picker-input-hex">
            <InputContainer :info="info.hex" @change="handleChange"></InputContainer>
        </div>
        <div class="a-color-picker-input-rgba">
            <InputContainer :info="info.r" @change="handleChange"></InputContainer>
            <InputContainer :info="info.g" @change="handleChange"></InputContainer>
            <InputContainer :info="info.b" @change="handleChange"></InputContainer>
            <InputContainer :info="info.a" @change="handleChange"></InputContainer>
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
            const info = reactive({
                hex: { key: 'hex', name: 'HEX', value: props.colorObj.hex, error: false },
                r: { key: 'r', name: 'R', value: props.colorObj.rgba.r, error: false },
                g: { key: 'g', name: 'G', value: props.colorObj.rgba.g, error: false },
                b: { key: 'b', name: 'B', value: props.colorObj.rgba.b, error: false },
                a: { key: 'a', name: 'Alpha', value: props.colorObj.rgba.a, error: false },
            })

            watch(() => props.colorObj, val => {
                info.hex.value = val.rgba.a === 1 ? val.hex : ''
                info.r.value = val.rgba.r
                info.g.value = val.rgba.g
                info.b.value = val.rgba.b
                info.a.value = val.rgba.a
            })

            return {
                info,
                handleChange,
            }

            /**
             * 处理手动输入颜色
             * @param {String} key
             * @param {String} value
             */
            function handleChange (key, value) {
                info[key].value = value

                if (!validate(key, info)) {
                    return
                }

                const colorStr = key === 'hex'
                    ? info.hex.value
                    : `rgba(${info.r.value}, ${info.g.value}, ${info.b.value}, ${info.a.value})`
                context.emit('change', colorStr)
            }
        },
    }

    /**
     * 根据输入的表单判断输入值是否合法
     * @param {String} inputKey
     * @param {Object} info
     * @return {Boolean}
     */
    function validate (inputKey, info) {
        let result = true
        const { hex, r, g, b, a } = info

        if (inputKey === 'hex') {
            const hexCore = hex.value.slice(1)
            const { length } = hexCore
            if (hex.value.startsWith('#') && (length === 3 || length === 6) && !hexCore.match(/[^0-9a-fA-F]/)) {
                hex.error = false
            } else {
                hex.error = true
                result = false
            }
        } else if (inputKey === 'a') {
            if (a.value >= 0 && a.value <= 1) {
                a.error = false
            } else {
                a.error = true
                result = false
            }
        } else {
            const list = [r, g, b]
            list.forEach(item => {
                const { key, value } = item
                if (key === inputKey) {
                    if (value >= 0 && value <= 255) {
                        item.error = false
                    } else {
                        item.error = true
                        result = false
                    }
                }
            })
        }

        return result
    }
</script>
