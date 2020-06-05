<template>
    <div class="a-color-picker-recommend">
        <div v-for="(color, index) in colors"
            :key="color + index"
            :style="{ background: color || '#fff' }"
            :class="['a-color-picker-recommend-color', selectedColor === color && 'selected', color === '' && 'empty-color']"
            @click="handleClick(color)"
        ></div>
    </div>
</template>

<script>
    import { ref, nextTick, watch } from 'vue'
    import tinycolor from 'tinycolor2'

    export default {
        name: 'RecommendColors',
        props: {
            colorObj: {
                type: Object,
                required: true,
            },
            recommend: {
                type: [Boolean, Array],
                default: true,
            },
        },
        setup (props, context) {
            const colors = ref([])
            const selectedColor = ref(null)

            // 每次修改颜色后预设面板都会取消预设选择的样式，即便预设和当前色一样
            watch(() => props.colorObj, () => {
                selectedColor.value = null
            })
            watch(() => props.recommend, val => {
                colors.value = getColorsFromRecommend(val)
            }, { immediate: true })

            const handleClick = color => {
                context.emit('change', color)
                nextTick(() => {
                    selectedColor.value = color
                })
            }

            return {
                colors, selectedColor, handleClick,
            }
        },
    }

    /**
     * 校验、处理预设值
     * @param {Boolean|Array<String>} recommend
     * @return {Array<String>}
     */
    function getColorsFromRecommend (recommend) {
        if (recommend === true) {
            return [
                '',
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#ddffff',
                '#00ced1',
                '#3a84ff',
                '#a933f5',
                '#db7093',
                '#000000',
                '#494949',
                '#9B9B9B',
                '#ffffff',
            ]
        } else if (Array.isArray(recommend)) {
            // 如果预设值是无效的，这里按空字符串处理以显示提示用户，应该输入正确的色值
            return recommend.map(color => tinycolor(color).isValid() ? color : '')
        } else {
            return []
        }
    }
</script>
