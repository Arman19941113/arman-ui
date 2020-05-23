<template>
    <div class="app-main">
        <SideNav :groups="groups" />
        <div class="app-content">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
    import groups from '@/components'

    export default {
        setup () {
            return {
                groups,
            }
        },
    }
</script>
