<template>
    <header class="header-container">
        <div class="welcome">
            {{ $t('你好') + username }}
        </div>
        <div class="links">
            <router-link to="/home">{{ $t('首页') }}</router-link>
            <router-link to="/about">{{ $t('关于') }}</router-link>
        </div>
        <div class="language">
            <span :class="language === 'zh' && 'active'" @click="setLanguage('zh')">中文</span>
            <span :class="language === 'en' && 'active'" @click="setLanguage('en')">English</span>
        </div>
    </header>
</template>

<script lang="ts">
    import { store } from '@/store'
    import { computed, onMounted, reactive, ref } from 'vue'

    export default {
        setup () {
            const state = reactive({
                count: 0
            })

            const { username } = useFetchData()

            return {
                state,
                username,
                language: computed(() => store.state.language),
                setLanguage
            }
        }
    }

    function setLanguage (language: string) {
        store.commit('updateLanguage', language)
        location.reload()
    }

    function useFetchData () {
        const username = ref('')

        onMounted(async () => {
            try {
                const res = await store.dispatch('getUsername')
                username.value = res.data
            } catch (e) {
                console.warn(e)
            }
        })
        return { username }
    }
</script>

<style scoped>
    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        padding: 0 20px;
        .welcome {
            width: 140px;
        }
        .links {
            display: flex;
            justify-content: space-between;
            width: 140px;
            a {
                cursor: pointer;
                &.router-link-exact-active {
                    color: palevioletred;
                }
            }
        }
        .language {
            width: 140px;
            text-align: right;
            span {
                cursor: pointer;
                &.active {
                    color: palevioletred;
                }
            }
        }
    }
</style>
