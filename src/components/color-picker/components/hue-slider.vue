<template>
    <div ref="container"
        tabindex="0"
        class="a-color-picker-hue"
        @keydown="handleArrowKeydown"
        @mousedown.stop="handleMouseDown">
        <div class="a-color-picker-hue-pointer" :style="pointerStyle">
            <div class="a-color-picker-hue-rectangle"></div>
        </div>
    </div>
</template>

<script>
    import { ref, computed } from 'vue'
    import { clamp, getTouches } from '../utils'

    export default {
        name: 'HueSlider',
        props: {
            colorObj: {
                type: Object,
                required: true,
            },
        },
        setup (props, context) {
            const container = ref(null)
            const pointerStyle = computed(() => ({
                left: `${props.colorObj.hsv.h / 360 * 100}%`
            }))

            return {
                container,
                pointerStyle,
                handleArrowKeydown,
                handleMouseDown,
            }

            function handleArrowKeydown (e) {
                const { clientWidth } = container.value
                let left = props.colorObj.hsv.h / 360 * clientWidth
                const step = 2
                const hugeStep = 10
                switch (e.code) {
                    case 'ArrowLeft':
                        left = clamp(left - step, 0, clientWidth)
                        break
                    case 'ArrowRight':
                        left = clamp(left + step, 0, clientWidth)
                        break
                    case 'ArrowUp':
                        left = clamp(left - hugeStep, 0, clientWidth)
                        break
                    case 'ArrowDown':
                        left = clamp(left + hugeStep, 0, clientWidth)
                        break
                    default:
                        return
                }
                handlePointChange(null, left)
            }

            function handleMouseDown (e) {
                container.value.focus()
                handlePointChange(e)
                window.addEventListener('mousemove', handlePointChange, { passive: true })
                window.addEventListener('mouseup', handleMouseUp)
            }

            function handleMouseUp () {
                window.removeEventListener('mousemove', handlePointChange)
                window.removeEventListener('mouseup', handleMouseUp)
            }

            /**
             * 色相面板变化
             * @param {MouseEvent | null} e 鼠标滑动事件
             * @param {number} [appointedLeft] 键盘事件对应坐标，如果有就优先使用
             */
            function handlePointChange (e, appointedLeft) {
                const left = appointedLeft !== undefined ? appointedLeft : getLeft(e)
                changeColor(left / container.value.clientWidth)
            }

            function getLeft (e) {
                const xOffset = container.value.getBoundingClientRect().left + window.pageXOffset
                const pageX = e.pageX || getTouches(e, 'PageX')

                return clamp(pageX - xOffset, 0, container.value.clientWidth)
            }

            function changeColor (ratio) {
                const { h, s, l, a } = props.colorObj.hsl
                const newHue = ratio * 360
                if (h !== newHue) {
                    context.emit('colorChange', { h: newHue, s, l, a, source: 'hsl' })
                }
            }
        },
    }
</script>
