<template>
    <div ref="container"
        tabindex="0"
        class="a-color-picker-saturation"
        :style="backgroundStyle"
        @keydown="handleArrowKeydown"
        @mousedown.stop="handleMouseDown">
        <!-- 从左到右饱和度 saturation 增大 -->
        <div class="a-color-picker-saturation-white"></div>
        <!-- 从上到下明度 lightness 减小 -->
        <div class="a-color-picker-saturation-black"></div>
        <div class="a-color-picker-pointer" :style="pointerStyle">
            <div class="a-color-picker-circle"></div>
        </div>
    </div>
</template>

<script>
    import { ref, computed } from 'vue'
    import { clamp, getTouches } from '../utils'

    export default {
        name: 'SaturationPanel',
        props: {
            colorObj: {
                type: Object,
                required: true,
            },
        },
        setup (props, context) {
            const container = ref(null)
            const backgroundStyle = computed(() => ({
                background: `hsl(${props.colorObj.hsv.h}, 100%, 50%)`,
            }))
            const pointerStyle = computed(() => ({
                top: `${(1 - props.colorObj.hsv.v) * 100}%`,
                left: `${props.colorObj.hsv.s * 100}%`,
            }))

            return {
                container, backgroundStyle, pointerStyle,
                handleArrowKeydown, handleMouseDown,
            }

            function handleArrowKeydown (e) {
                const { clientWidth, clientHeight } = container.value
                let left = props.colorObj.hsv.s * clientWidth
                let top = (1 - props.colorObj.hsv.v) * clientHeight
                const step = 10
                switch (e.code) {
                    case 'ArrowLeft':
                        left = clamp(left - step, 0, clientWidth)
                        break
                    case 'ArrowRight':
                        left = clamp(left + step, 0, clientWidth)
                        break
                    case 'ArrowUp':
                        top = clamp(top - step, 0, clientHeight)
                        break
                    case 'ArrowDown':
                        top = clamp(top + step, 0, clientHeight)
                        break
                    default:
                        return
                }
                handlePointChange(null, left, top)
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
             * 饱和度面板变化
             * @param {MouseEvent | null} e 鼠标滑动事件
             * @param {number} [appointedLeft] 键盘事件对应坐标，如果有就优先使用
             * @param {number} [appointedTop] 键盘事件对应坐标，如果有就优先使用
             */
            function handlePointChange (e, appointedLeft, appointedTop) {
                const { clientWidth, clientHeight } = container.value
                const left = appointedLeft !== undefined ? appointedLeft : getLeft(e)
                const top = appointedTop !== undefined ? appointedTop : getTop(e)
                const saturation = left / clientWidth
                const bright = 1 - top / clientHeight

                changeColor(props.colorObj.hsv.h, saturation, bright, props.colorObj.hsv.a)
            }

            function getLeft (e) {
                const xOffset = container.value.getBoundingClientRect().left + window.pageXOffset
                const pageX = e.pageX || getTouches(e, 'PageX')

                return clamp(pageX - xOffset, 0, container.value.clientWidth)
            }

            function getTop (e) {
                const yOffset = container.value.getBoundingClientRect().top + window.pageYOffset
                const pageY = e.pageY || getTouches(e, 'PageY')

                return clamp(pageY - yOffset, 0, container.value.clientHeight)
            }

            function changeColor (h, s, v, a) {
                context.emit('colorChange', { h, s, v, a, source: 'hsva' })
            }
        },
    }
</script>
