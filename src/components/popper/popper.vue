<template>
    <div ref="popper" class="a-popper" @click.stop>
        <transition name="drop">
            <div v-show="showPopper" class="a-popper-container">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    import { ref, watchEffect, onMounted } from 'vue'
    import { createPopper } from '@popperjs/core'

    export default {
        name: 'APopper',
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            // reference dom
            reference: {
                required: true,
            },
        },
        setup (props) {
            const popper = ref(null)
            const showPopper = ref(props.value)

            onMounted(() => {
                useValueEffect(props, popper, showPopper)
            })

            return {
                popper,
                showPopper,
            }
        },
    }

    function useValueEffect (props, popper, showPopper) {
        let popperInstance = null
        let isRendering = false
        const queue = []

        watchEffect(() => {
            if (props.value === false) {
                if (isRendering) {
                    queue.push('close')
                    return
                }
                handleClose()
            } else if (props.value === true) {
                if (isRendering) {
                    queue.push('open')
                    return
                }
                handleOpen()
            }
        })

        function viewQueue () {
            if (!queue.length) return
            const lastTask = queue[queue.length - 1]
            if (lastTask === 'close') handleClose()
            else if (lastTask === 'open') handleOpen()
            queue.splice(0)
        }

        function handleClose () {
            if (popperInstance !== null) {
                isRendering = true
                showPopper.value = false
                setTimeout(() => {
                    popperInstance.destroy()
                    popperInstance = null
                    isRendering = false
                    viewQueue()
                }, 220)
            }
        }

        function handleOpen () {
            isRendering = true
            showPopper.value = true
            const reference = props.reference.$el
            popperInstance = createPopper(reference, popper.value, {
                placement: 'bottom-start',
                modifiers: [{
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                }],
                strategy: 'fixed',
            })
            setTimeout(() => {
                isRendering = false
                viewQueue()
            }, 220)
        }
    }
</script>

<style>
    @import "~@/css/variable.css";
    .a-popper {
        position: fixed;
        top: -2000px;
        left: -2000px;
        .a-popper-container {
            transform-origin: top;
        }
        .drop-enter-active {
            animation: transitionDropIn .2s ease-in-out;
        }
        .drop-leave-active {
            animation: transitionDropIn .2s ease-in-out reverse;
        }
        @keyframes transitionDropIn {
            0% {opacity: 0;transform: scaleY(0);}
            100% {opacity: 1;transform: scaleY(1);}
        }
    }
</style>
