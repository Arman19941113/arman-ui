<template>
    <div class="app-main">
        <SideNav :groups="groups" />
        <div class="app-content">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
    import SideNav from './SideNav.vue'
    import groups from '../guides'

    export default {
        components: { SideNav },
        setup () {
            return {
                groups,
            }
        },
    }
</script>
