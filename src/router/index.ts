import { defineAsyncComponent } from "vue"
import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '@/views/NotFound.vue'

const Home = defineAsyncComponent(() => import(/* webpackChunkName: 'Home' */"@/views/Home.vue"))
const About = defineAsyncComponent(() => import(/* webpackChunkName: 'About' */"@/views/About.vue"))

export const router = createRouter({
    history: createWebHistory(window.SITE_URL),
    routes: [
        {
            path: '/',
            redirect: { name: 'Home' }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/*',
            name: 'NotFound',
            component: NotFound
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
