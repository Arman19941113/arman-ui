<template>
    <header class="app-header">
        <div class="left-header">
            <div class="logo" @click="handleClickLogo">
                <AIcon name="lighting" width="24" style="margin-right: 4px;"></AIcon>
                arman-ui
            </div>
            <a href="https://github.com/Arman19941113/arman-ui" target="_blank">
                <AIcon name="github" width="24" class="github-icon" />
            </a>
        </div>
        <div class="right-header">
            <div class="navs">
                <router-link class="nav-item" to="/guides">指南</router-link>
                <router-link class="nav-item" to="/components">组件</router-link>
            </div>
            <AInput ref="reference" round placeholder="搜索"
                v-model="searchValue"
                @update:modelValue="handleInputUpdate"
                @click.stop
                @focus="handleFocus" />
            <APopper :value="Boolean(searchValue && showPopper)" :reference="reference">
                <div class="search-result">
                    <div v-if="Boolean(searchValue && !matchedNames.length)" class="empty-search">没有找到匹配文档</div>
                    <ul v-else class="match-list">
                        <li class="match-item" v-for="name in matchedNames" @click="goToSearchItem(name)">{{name}}</li>
                    </ul>
                </div>
            </APopper>
        </div>
    </header>
</template>

<script>
    import { ref } from 'vue'
    import AIcon from '@/components/icon'
    import AInput from '@/components/input'
    import APopper from '@/components/popper'
    import { router } from '../router'
    import guidesGroups from '../guides'
    import componentsGroups from '../components'

    export default {
        name: 'AppHeader',
        components: { AIcon, AInput, APopper },
        setup () {
            const reference = ref(null)
            const { showPopper, handleFocus } = useClickSearch()
            const { handleInputUpdate, searchValue, matchedNames } = useInputSearch()

            return {
                reference,
                showPopper, handleFocus,
                searchValue, matchedNames, handleInputUpdate,
                handleClickLogo () {
                    router.push({ name: 'home' })
                },
                goToSearchItem (name) {
                    const rawName = name.split(' ')[0]
                    const camelName = rawName[0].toLowerCase() + rawName.slice(1)
                    router.push({ name: camelName })
                    showPopper.value = false
                },
            }
        },
    }

    function useClickSearch () {
        let showPopper = ref(false)
        const handleFocus = () => {
            showPopper.value = true
            document.addEventListener('click', () => {
                showPopper.value = false
            }, { once: true })
        }

        return { showPopper, handleFocus }
    }

    function useInputSearch () {
        const searchValue = ref('')
        const names = [...getNames(guidesGroups), ...getNames(componentsGroups)]
        const matchedNames = ref([])
        const handleInputUpdate = value => {
            matchedNames.value.splice(0)
            value !== '' && names.forEach(name => {
                if (name.toLowerCase().includes(value.toLowerCase())) {
                    matchedNames.value.push(name)
                }
            })
        }

        return {
            handleInputUpdate, searchValue, matchedNames,
        }

        function getNames (groups) {
            const names = []
            groups.forEach(group => {
                group.components.forEach(component => {
                    names.push(component.name)
                })
            })
            return names
        }
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
            .logo {
                display: flex;
                align-items: center;
                cursor: pointer;
                transition: all .3s;
                &:hover {
                    color: $primaryColor;
                    transition: all .3s;
                }
            }
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
                    &:hover {
                        color: $primaryColor;
                        transition: all .3s;
                    }
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
            .search-result {
                width: 240px;
                padding: 10px 0;
                border: 1px solid $borderColor;
                border-radius: 2px;
                background-color: $whiteColor;
                font-size: 12px;
                line-height: 36px;
                .empty-search {
                    padding: 0 12px;
                }
                .match-list {
                    .match-item {
                        padding: 0 12px;
                        transition: background-color .2s;
                        cursor: pointer;
                        &:hover {
                            background-color: $cursorBlueColor;
                            transition: background-color .2s;
                        }
                    }
                }
            }
        }
    }
</style>
