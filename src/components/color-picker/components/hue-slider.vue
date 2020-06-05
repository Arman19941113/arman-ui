<template>
    <div ref="container"
        class="a-color-picker-hue"
        @mousedown.prevent.stop="handleMouseDown">
        <div class="a-color-picker-hue-pointer" :style="{ left: percent }">
            <div class="a-color-picker-hue-rectangle"></div>
        </div>
    </div>
</template>

<script>
    import { ref, watch } from 'vue'
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
            const percent = ref(clamp(props.colorObj.hsl.h * 100 / 360, 0, 100) + '%')

            watch(() => props.colorObj, val => {
                percent.value = clamp(val.hsl.h * 100 / 360, 0, 100) + '%'
            })

            return {
                percent,
                container,
                handleMouseDown,
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
                const left = getLeft(e)
                if (left < 0) {
                    changeColor(0)
                    return
                }

                const { clientWidth } = container.value
                if (left > clientWidth) {
                    changeColor(100)
                    return
                }

                changeColor(left * 100 / clientWidth)
            }

            function getLeft (e) {
                const xOffset = container.value.getBoundingClientRect().left + window.pageXOffset
                const pageX = e.pageX || getTouches(e, 'PageX')

                return pageX - xOffset
            }

            function changeColor (p) {
                percent.value = clamp(p, 0, 100) + '%'

                const { h, s, l, a } = props.colorObj.hsl
                const newHue = clamp(p / 100 * 360, 0, 360)
                if (h !== newHue) {
                    context.emit('change', { h: newHue, s, l, a, source: 'hsl' })
                }
            }
        },
    }
</script>
