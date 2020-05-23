import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Docs from '@/views/Docs.vue'
import Components from '@/views/Components.vue'
import NotFound from '@/views/NotFound.vue'

const Install = defineAsyncComponent(() => import(/* webpackChunkName: 'Install' */'@/docs/install.md'))
const Start = defineAsyncComponent(() => import(/* webpackChunkName: 'Start' */'@/docs/start.md'))

const Button = defineAsyncComponent(() => import(/* webpackChunkName: 'Button' */'@/components/button/button.md'))
const Input = defineAsyncComponent(() => import(/* webpackChunkName: 'Input' */'@/components/Input/Input.md'))

export const router = createRouter({
    history: createWebHistory(window.SITE_URL),
    routes: [{
        path: '',
        redirect: { name: 'home' },
    }, {
        path: '/home',
        name: 'home',
        component: Home,
    }, {
        path: '/docs',
        name: 'docs',
        component: Docs,
        children: [{
            path: '',
            redirect: { name: 'install' },
        }, {
            path: 'install',
            name: 'install',
            component: Install,
        }, {
            path: 'start',
            name: 'start',
            component: Start,
        }],
    }, {
        path: '/components',
        name: 'components',
        component: Components,
        children: [{
            path: '',
            redirect: { name: 'button' },
        }, {
            path: 'button',
            name: 'button',
            component: Button,
        }, {
            path: 'input',
            name: 'input',
            component: Input,
        }],
    }, {
        path: '/*',
        name: 'notFound',
        component: NotFound,
    },
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})
