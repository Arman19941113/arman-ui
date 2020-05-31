<template>
    <div class="app-home">
        <div class="banner">Arman Ui</div>
        <div class="description">一个基于 Vue 3.0 的前端组件库</div>
        <div class="buttons">
            <AButton round style="margin-right: 20px;" @click="goComponents">查看组件</AButton>
            <AButton theme="primary" round @click="goGuides">开始使用</AButton>
        </div>
    </div>
</template>

<script>
    import AButton from '@/components/button'
    import { router } from '../router'

    export default {
        components: {
            AButton,
        },
        methods: {
            goComponents () {
                router.push({
                    name: 'button',
                })
            },
            goGuides () {
                router.push({
                    name: 'install',
                })
            },
        },
    }
</script>

<style>
    @import "~@/css/variable.css";
    .app-home {
        .banner {
            margin-top: 40px;
            text-align: center;
            vertical-align: center;
            line-height: 100px;
            font-size: 64px;
            font-weight: 600;
            color: $fontColor;
        }
        .description {
            text-align: center;
            color: $fontColorLight;
        }
        .buttons {
            display: flex;
            justify-content: center;
            margin-top: 24px;
        }
    }
</style>
