<template>
    <div tabindex="0" class="a-color-picker-recommend"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keydown="handleKeydown">
        <div v-for="(color, index) in colors"
            :key="color + index"
            :style="{ background: color || '#fff' }"
            :class="['a-color-picker-recommend-color', isFocused && selectedIndex === index && 'selected', color === '' && 'empty-color']"
            @click="selectColor(index)">
            <div class="a-color-picker-pointer" v-show="selectedIndex === index">
                <div class="a-color-picker-circle"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, nextTick, watch, computed } from 'vue'
    import tinycolor from 'tinycolor2'
    import { clamp } from '../utils'

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
            const colors = computed(() => getColorsFromRecommend(props.recommend))
            const selectedIndex = ref(-1)
            const selectedColor = ref(null)

            // 每次在外部修改颜色后预设面板都会取消预设选择的样式，即便预设和当前色一样
            // 预设里面修改颜色会在 nextTick 恢复状态
            watch(() => props.colorObj, () => {
                selectedIndex.value = -1
                selectedColor.value = null
            })

            return {
                isFocused: ref(false),
                colors, selectedIndex, selectedColor, selectColor,
                handleKeydown,
            }

            function handleKeydown (e) {
                if (e.code === 'Tab') {
                    context.emit('tab')
                } else {
                    let index = 0
                    const rowNum = 10 // 每行展示的颜色块个数，和样式相关联
                    const max = colors.value.length - 1
                    switch (e.code) {
                        case 'ArrowLeft':
                            index = clamp(selectedIndex.value - 1, 0, max)
                            break
                        case 'ArrowRight':
                            index = clamp(selectedIndex.value + 1, 0, max)
                            break
                        case 'ArrowUp':
                            index = clamp(selectedIndex.value - rowNum, 0, max)
                            break
                        case 'ArrowDown':
                            index = clamp(selectedIndex.value + rowNum, 0, max)
                            break
                        default:
                            return
                    }
                    selectColor(index)
                }
            }

            function selectColor (index) {
                const color = colors.value[index]
                context.emit('colorChange', color)
                nextTick(() => {
                    selectedIndex.value = index
                    selectedColor.value = color
                })
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
        },
    }
</script>
