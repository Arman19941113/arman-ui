<template>
    <div class="app-main">
        <SideNav :groups="groups" />
        <div class="app-content">
            <router-view />
        </div>
    </div>
</template>

<script>
    import SideNav from './SideNav.vue'
    import groups from '../components'

    export default {
        components: { SideNav },
        setup () {
            return {
                groups,
            }
        },
    }
</script>
