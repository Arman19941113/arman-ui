import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Guides from './views/Guides.vue'
import Components from './views/Components.vue'
import NotFound from './views/NotFound.vue'

const Install = defineAsyncComponent(() => import(/* webpackChunkName: 'Install' */'./guides/install.md'))
const Start = defineAsyncComponent(() => import(/* webpackChunkName: 'Start' */'./guides/start.md'))

const Icon = defineAsyncComponent(() => import(/* webpackChunkName: 'Icon' */'./components/icon.md'))
const Button = defineAsyncComponent(() => import(/* webpackChunkName: 'Button' */'./components/button.md'))
const Input = defineAsyncComponent(() => import(/* webpackChunkName: 'Input' */'./components/input.md'))
const ColorPicker = defineAsyncComponent(() => import(/* webpackChunkName: 'ColorPicker' */'./components/color-picker.md'))
const Loading = defineAsyncComponent(() => import(/* webpackChunkName: 'Loading' */'./components/loading.md'))
const Popper = defineAsyncComponent(() => import(/* webpackChunkName: 'Popper' */'./components/popper.md'))

export const router = createRouter({
    history: createWebHistory('/arman-ui/'),
    routes: [{
        path: '',
        redirect: { name: 'home' },
    }, {
        path: '/home',
        name: 'home',
        component: Home,
    }, {
        path: '/guides',
        name: 'guides',
        component: Guides,
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
            path: 'icon',
            name: 'icon',
            component: Icon,
        }, {
            path: 'button',
            name: 'button',
            component: Button,
        }, {
            path: 'colorPicker',
            name: 'colorPicker',
            component: ColorPicker,
        }, {
            path: 'input',
            name: 'input',
            component: Input,
        }, {
            path: 'loading',
            name: 'loading',
            component: Loading,
        }, {
            path: 'popper',
            name: 'popper',
            component: Popper,
        }],
    }, {
        path: '/:catchAll(.*)',
        name: 'notFound',
        component: NotFound,
    }],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})
