<template>
    <transition name="fade">
        <div v-show="value" ref="root" class="a-loading" :style="{ position: global && 'fixed', zIndex, background }" @click.stop>
            <!-- 变化圆弧 -->
            <svg v-if="type === 'default'" :style="computedSize" class="flex-loading" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="29" fill="none" stroke="#409EFF" stroke-width="6" stroke-linecap="round" />
            </svg>
            <!-- 普通圆弧 -->
            <svg v-if="type === 'linear'" :style="computedSize" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="29" fill="none" stroke="#409EFF" stroke-width="6" stroke-linecap="round" stroke-dasharray="60,200">
                    <animateTransform attributeName="transform" type="rotate" begin="0s" dur="1s" from="0 32 32" to="360 32 32" repeatCount="indefinite" />
                </circle>
            </svg>
            <!-- 扩散圆圈 -->
            <div v-if="type === 'wave'" :style="computedSize" class="wave-loading"></div>
            <!-- 四点旋转 -->
            <div v-if="type === 'dots'" :style="computedSize" class="dots-loading">
                <div class="dots-loading-item" :style="computedSizeHalf"></div>
                <div class="dots-loading-item" :style="computedSizeHalf"></div>
                <div class="dots-loading-item" :style="computedSizeHalf"></div>
                <div class="dots-loading-item" :style="computedSizeHalf"></div>
            </div>

            <div v-if="text" class="a-loading-text">{{text}}</div>
        </div>
    </transition>
</template>

<script>
    import { ref, computed, onMounted, watch } from 'vue'
    import stackManager from '@/util/stackManager'

    export default {
        name: 'ALoading',
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
                default: 'default',
                validator (value) {
                    if (['default', 'linear', 'wave', 'dots'].includes(value)) {
                        return true
                    } else {
                        console.error(`type property is not valid: '${value}'`)
                        return false
                    }
                },
            },
            width: {
                type: [Number, String],
                default: 40,
            },
            global: {
                type: Boolean,
                default: false,
            },
            background: {
                type: String,
                default: 'rgba(255, 255, 255, .8)',
            },
            text: {
                type: String,
                default: '',
            },
        },
        setup (props) {
            const root = ref(null)
            const zIndex = ref(0)

            watch(() => props.value, val => {
                if (val) zIndex.value = stackManager.nextStack()
            }, { immediate: true })

            onMounted(() => {
                const { parentNode } = root.value
                if (getComputedStyle(parentNode).position === 'static') {
                    parentNode.style.position = 'relative'
                }
            })

            return {
                root,
                zIndex,
                computedSize: computed(() => ({
                    width: props.width + 'px',
                    height: props.width + 'px',
                })),
                computedSizeHalf: computed(() => ({
                    width: props.width / 2 + 'px',
                    height: props.width / 2 + 'px',
                })),
            }
        },
    }
</script>

<style>
    @import "./loading.css";
</style>
