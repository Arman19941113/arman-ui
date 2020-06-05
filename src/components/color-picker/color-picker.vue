<template>
    <div ref="reference"
        :class="['a-color-picker',`a-color-picker-${size}` , showPopper && 'active', showValue && 'a-color-picker-show-value']"
        @click="handleClickPicker">
        <div class="a-color-picker-color">
            <!-- 如果传入的色值为空字符串或者没有传值默认白色背景 + 中间一个叉 -->
            <AIcon v-if="colorStr === ''" name="close-bold" class="a-color-picker-color-square" />
            <span v-else class="a-color-picker-color-square" :style="{ background: colorStr }"></span>
        </div>
        <div class="a-color-picker-text" v-if="showValue">
            <span>{{colorStr}}</span>
        </div>
        <div class="a-color-picker-icon">
            <AIcon name="odd-arrow" class="icon-odd-arrow" />
        </div>
        <APopper :value="showPopper" :reference="reference">
            <div class="a-color-picker-dropdown" @click.stop>
                <!-- 饱和度面板 -->
                <div class="a-color-picker-saturation-container">
                    <SaturationPanel :color-obj="colorObj" @change="handleColorChange"></SaturationPanel>
                </div>
                <!-- 色彩条 -->
                <div class="a-color-picker-hue-container">
                    <HueSlider :color-obj="colorObj" @change="handleColorChange"></HueSlider>
                </div>
                <!-- 色彩值 -->
                <div class="a-color-picker-input-container">
                    <ColorInput :color-obj="colorObj" @change="handleColorChange"></ColorInput>
                </div>
                <!-- 预设值 -->
                <div class="a-color-picker-recommend-container" v-if="isRenderRecommend">
                    <RecommendColors :color-obj="colorObj" :recommend="recommend" @change="handleColorChange"></RecommendColors>
                </div>
            </div>
        </APopper>
    </div>
</template>

<script>
    import { ref, computed, watch } from 'vue'
    import AIcon from 'arman-ui/lib/icon'
    import APopper from 'arman-ui/lib/popper'
    import SaturationPanel from './components/saturation-panel.vue'
    import HueSlider from './components/hue-slider.vue'
    import ColorInput from './components/color-input.vue'
    import RecommendColors from './components/recommend-colors.vue'
    import { formatColor, toRGBAString } from './utils'
    import tinycolor from 'tinycolor2'

    export default {
        name: 'AColorPicker',
        components: {
            AIcon,
            APopper,
            SaturationPanel,
            HueSlider,
            ColorInput,
            RecommendColors,
        },
        props: {
            modelValue: {
                type: String,
                default: '',
            },
            size: {
                type: String,
                default: '',
                validator (val) {
                    return ['', 'large', 'small'].includes(val)
                },
            },
            // 是否在颜色选择器上显示色值
            showValue: {
                type: Boolean,
                default: true,
            },
            // true 展示组件内置预设值
            // false 不展示预设值
            // 数组 自定义预设值
            recommend: {
                type: [Boolean, Array],
                default: true,
            },
        },
        setup (props, context) {
            const reference = ref(null)
            const isRenderRecommend = computed(() => {
                return Boolean(props.recommend === true || (Array.isArray(props.recommend) && props.recommend.length))
            })
            const { colorStr, colorObj, handleColorChange, changeColorFromProps } = useColorInfo(props, context)
            const { showPopper, handleClickPicker } = useShowPopper(changeColorFromProps, reference)

            // 1. 组件初始化时，如果计算的色值和传入的值不一样，显示计算的色值
            changeColorFromProps({ isCreated: true })

            watch(() => props.modelValue, () => {
                // 2. 如果组件绑定值被外部修改，自动根据绑定至更新组件色值
                changeColorFromProps()
            })

            return {
                reference,
                isRenderRecommend, // 是否渲染预设值
                showPopper, handleClickPicker,
                colorStr, // 当前颜色的色值，如果为空字符串显示：默认白色背景 + 中间一个叉
                colorObj, // 储存当前颜色的相关信息
                handleColorChange,
            }

        },
    }

    function useColorInfo (props, context) {
        const colorStr = ref('')
        const colorObj = ref(formatColor('#FFFFFF'))

        /**
         * 组件内部选择颜色处理
         * @param {String | Object} val
         */
        const handleColorChange = val => {
            // 组件内容拿到的色值都是合法的，空字符串特殊处理
            if (val === '') {
                colorStr.value = ''
                colorObj.value = formatColor('#FFFFFF')
                context.emit('update:modelValue', '')
                return
            }

            const obj = formatColor(val)
            const str = obj.rgba.a === 1 ? obj.hex : toRGBAString(obj.rgba)
            colorObj.value = obj
            colorStr.value = str
            context.emit('update:modelValue', str)
        }

        /**
         * created 时、props.modelValue 变化时、每次关闭组件时调用
         * @param {Object} option ['isCreated']是否是实例创建完成后的第一次调用
         */
        const changeColorFromProps = ({ isCreated = false } = {}) => {
            // 空字符串为默认值且合法
            if (props.modelValue === '') {
                // 颜色选择器有色值，用户手动修改为空字符串；或用户关闭组件时绑定的modelValue为空字符串（没有使用组件传递的值）
                if (colorStr.value !== '') {
                    colorStr.value = ''
                    colorObj.value = formatColor('#FFFFFF')
                }
                return
            }

            // 根据 props 计算色值
            const newColorObj = formatColor(props.modelValue)
            const newColorStr = newColorObj.rgba.a === 1 ? newColorObj.hex : toRGBAString(newColorObj.rgba)

            // 根据 props 计算的色值和组件内部色值不一致，有几种情况
            if (newColorStr !== colorStr.value) {
                // 传入的值是否是合法的色值
                const isValid = tinycolor(props.modelValue).isValid()
                // 实例挂载之前
                if (isCreated) {
                    // 传入了非法的色值，按空字符串处理并触发 change 事件
                    if (!isValid) {
                        colorObj.value = formatColor('#FFFFFF')
                        context.emit('update:modelValue', '')
                    } else {
                        // 到了这里，说明传入的色值已经计算出来了，是合法的，但可能存在格式上的偏差，如用户传入 #fff 计算得 #FFFFFF
                        colorStr.value = newColorStr.toLowerCase() === props.modelValue.toLowerCase()
                            ? props.modelValue // 如果只是大小写不一致，显示用户传入的字符
                            : newColorStr // 其它格式上的不一致，以本组件计算值为准
                        colorObj.value = newColorObj
                    }
                } else { // 实例挂载之后
                    // 用户在实例挂载之后在组件外面修改色值 组件内部只是跟着 props 变化色值 并不触发 change 事件
                    if (!isValid) {
                        colorStr.value = ''
                        colorObj.value = formatColor('#FFFFFF')
                    } else if (newColorStr.toLowerCase() !== colorStr.value.toLowerCase()) {
                        // 如果只是外部传入的值和当前组件显示的的值大小写不一致，不作处理
                        // 比如 props.modelValue === '#ffffff'，计算值为 '#FFFFFF'，不进行下面的处理直接显示 '#ffffff'
                        // 反之显示内部计算值：
                        colorObj.value = newColorObj
                        colorStr.value = newColorStr
                    }
                }
            }
        }

        return { colorStr, colorObj, handleColorChange, changeColorFromProps }
    }

    function useShowPopper (changeColorFromProps, reference) {
        const showPopper = ref(false)

        watch(showPopper, val => {
            if (val === false) {
                // 3. 关闭组件时如果绑定值与组件内部选择的值不一致（比如既没有使用 v-model 也没有监听 change 事件）显示绑定值
                changeColorFromProps()
            }
        })

        const handleClickOutside = e => {
            if (!reference.value.contains(e.target)) {
                showPopper.value = false
            }
        }

        const handleClickPicker = () => {
            showPopper.value = !showPopper.value
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside, { once: true })
            })
        }

        return { showPopper, handleClickPicker }
    }
</script>

<style>
    @import "./color-picker.css";
</style>
