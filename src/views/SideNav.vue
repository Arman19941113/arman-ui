<template>
    <div class="side-nav">
        <ul class="groups">
            <li class="group-item" v-for="group in groups" :key="group.name">
                <div class="group-name">{{group.groupName}}</div>
                <ul class="components">
                    <li class="component-item" v-for="component in group.components" :key="component.id">
                        <router-link class="component-name" :to="component.id">{{component.name}}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'SideNav',
        props: {
            groups: {
                type: Array,
                required: true,
            },
        },
    }
</script>

<style scoped>
    @import "~@/css/variable.css";
    .side-nav {
        margin: 40px 0;
        border-right: 1px solid $borderColorLight;
        width: 256px;
        height: calc(100% - 80px);
        overflow: auto;
        &::-webkit-scrollbar {
            width: 4px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 2px;
            background-color: $borderColorLight;
        }
        .group-item:not(:first-child) {
            margin-top: 20px;
        }
        .group-name {
            line-height: 30px;
            border-bottom: 1px solid $borderColorLight;
            margin: 0 24px 9px;
            color: $fontColorLight;
            font-size: 12px;
        }
        .component-name {
            position: relative;
            display: block;
            line-height: 40px;
            padding: 0 24px;
            color: $fontColorNormal;
            font-size: 14px;
            transition: all .3s;
            &.router-link-exact-active {
                color: $primaryColor;
                background-color: #E6F7FF;
                transition: all .3s;
                &::after {
                    display: block;
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 3px;
                    height: 100%;
                    background-color: $primaryColor;
                }
            }
        }
    }
</style>
