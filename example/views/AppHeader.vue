<template>
    <header class="app-header">
        <div class="left-header">
            <div class="logo">arman-ui</div>
            <a href="https://github.com/Arman19941113/arman-ui" target="_blank">
                <AIcon name="github" width="24" class="github-icon" />
            </a>
        </div>
        <div class="right-header">
            <div class="navs">
                <router-link class="nav-item" to="/guides">指南</router-link>
                <router-link class="nav-item" to="/components">组件</router-link>
            </div>
            <div class="search-container">search</div>
        </div>
    </header>
</template>

<script lang="ts">
    import AIcon from '@/components/icon'

    export default {
        name: 'AppHeader',
        components: { AIcon },
    }
</script>

<style>
    @import "~@/css/variable.css";
    .app-header {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        width: 100%;
        height: 64px;
        line-height: 40px;
        box-shadow: 0 2px 8px #f0f1f2;
        .left-header, .right-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
        }
        .left-header {
            width: 256px;
            padding: 0 24px;
            border-right: 1px solid $borderColorLight;
            .github-icon {
                cursor: pointer;
                transition: color .3s;
                &:hover {
                    color: $primaryColor;
                    transition: color .3s;
                }
            }
        }
        .right-header {
            width: calc(100% - 256px);
            padding: 0 40px 0 20px;
            .navs {
                display: flex;
                .nav-item {
                    position: relative;
                    padding: 0 20px;
                    transition: all .3s;
                    &::after {
                        display: block;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 3px;
                        border-radius: 1.5px;
                        background-color: $primaryColor;
                        content: '';
                        transform: scaleX(0);
                        transition: all .3s;
                    }
                    &.router-link-active {
                        color: $primaryColor;
                        transition: all .3s;
                        &::after {
                            transform: scaleX(.7);
                            transition: all .3s;
                        }
                    }
                }
            }
        }
    }
</style>
