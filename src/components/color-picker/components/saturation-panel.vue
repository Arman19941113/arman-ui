<template>
    <div ref="container"
        class="a-color-picker-saturation"
        :style="backgroundStyle"
        @mousedown.prevent.stop="handleMouseDown">
        <!-- 从左到右饱和度 saturation 增大 -->
        <div class="a-color-picker-saturation-white"></div>
        <!-- 从上到下明度 lightness 减小 -->
        <div class="a-color-picker-saturation-black"></div>
        <div class="a-color-picker-saturation-pointer" :style="pointerStyle">
            <div class="a-color-picker-saturation-circle"></div>
        </div>
    </div>
</template>

<script>
    import { ref, computed, watch } from 'vue'
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
            const backgroundStyle = computed(() => {
                return { background: `hsl(${props.colorObj.hsv.h}, 100%, 50%)` }
            })
            const pointerStyle = computed(() => {
                return { top: `${-(props.colorObj.hsv.v * 100) + 1 + 100}%`, left: `${props.colorObj.hsv.s * 100}%` }
            })

            return {
                container, backgroundStyle, pointerStyle, handleMouseDown,
            }

            function handleMouseDown (e) {
                handlePointChange(e)
                window.addEventListener('mousemove', handlePointChange, { passive: true })
                window.addEventListener('mouseup', handleMouseUp)
            }

            function handleMouseUp () {
                window.removeEventListener('mousemove', handlePointChange)
                window.removeEventListener('mouseup', handleMouseUp)
            }

            function handlePointChange (e) {
                const { clientWidth, clientHeight } = container.value
                const left = clamp(getLeft(e), 0, clientWidth)
                const top = clamp(getTop(e), 0, clientHeight)
                const saturation = left / clientWidth
                const bright = clamp(1 - top / clientHeight, 0, 1)

                changeColor(props.colorObj.hsv.h, saturation, bright, props.colorObj.hsv.a)
            }

            function getLeft (e) {
                const xOffset = container.value.getBoundingClientRect().left + window.pageXOffset
                const pageX = e.pageX || getTouches(e, 'PageX')

                return pageX - xOffset
            }

            function getTop (e) {
                const yOffset = container.value.getBoundingClientRect().top + window.pageYOffset
                const pageY = e.pageY || getTouches(e, 'PageY')

                return pageY - yOffset
            }

            function changeColor (h, s, v, a) {
                context.emit('change', { h, s, v, a, source: 'hsva' })
            }
        },
    }
</script>
