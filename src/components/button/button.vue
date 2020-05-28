<template>
    <button :class="['a-button', 'a-button-' + theme, isClicked && 'isClicked', loading && 'is-loading', round && 'is-round']"
        :style="{ padding: !hasSlots && '0 7px' }"
        :disabled="disabled"
        @click="handleClick">
        <div class="a-button-content" :style="{ visibility: loading ? 'hidden' : 'inherit' }">
            <AIcon v-if="icon" :name="icon" width="16" class="button-icon"></AIcon>
            <span class="button-text" :style="{ 'margin-left': icon && hasSlots && '5px', 'margin-right': iconRight && hasSlots && '5px' }"><slot></slot></span>
            <AIcon v-if="iconRight" :name="iconRight" width="16" class="button-icon"></AIcon>
        </div>
        <div v-if="loading" class="a-button-loading">
            <AIcon name="loading" width="20" :color="theme === 'default' ? '' : '#FFF'" class="loading-icon"></AIcon>
            <span v-if="loadingText" class="loading-text">{{loadingText}}</span>
        </div>
    </button>
</template>

<script lang="ts">
    import { ComponentObjectPropsOptions, ref, computed, SetupContext } from 'vue'
    import AIcon from '@/components/icon'

    export default {
        name: 'AButton',
        components: { AIcon },
        props: {
            theme: {
                type: String,
                default: 'default',
                validator (value: string) {
                    if (['default', 'primary', 'success', 'warning', 'danger'].includes(value)) {
                        return true
                    } else {
                        console.error(`theme property is not valid: '${value}'`)
                        return false
                    }
                },
            },
            icon: {
                type: String,
                default: '',
            },
            iconRight: {
                type: String,
                default: '',
            },
            loading: {
                type: Boolean,
                default: false,
            },
            loadingText: {
                type: String,
                default: '',
            },
            round: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        setup (props: ComponentObjectPropsOptions, context: SetupContext) {
            const { isClicked, handleClick } = useClickButton()
            const hasSlots = computed(() => Boolean(context.slots.default))

            return {
                isClicked,
                handleClick,
                hasSlots
            }
        },
    }

    function useClickButton () {
        const isClicked = ref(false)

        function handleClick () {
            isClicked.value = true
            setTimeout(() => {
                isClicked.value = false
            }, 300)
        }

        return {
            isClicked,
            handleClick,
        }
    }
</script>

<style>
    @import "./button.css";
</style>
