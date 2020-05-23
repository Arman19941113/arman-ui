<template>
    <div class="app-main">
        <SideNav :groups="groups" />
        <div class="app-content">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
    import SideNav from '@/views/SideNav.vue'
    import groups from '@/docs'

    export default {
        components: {
            SideNav,
        },
        setup () {
            return {
                groups,
            }
        },
    }
</script>
