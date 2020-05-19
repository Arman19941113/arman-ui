import { createStore } from 'vuex'
// import http from './http'
import mock from './mock'
import * as jsCookie from 'js-cookie'

export const store = createStore({
    modules: {},
    state: {
        language: 'zh'
    },
    getters: {},
    mutations: {
        updateLanguage (state, payload) {
            state.language = payload
            jsCookie.set('language', payload)
        }
    },
    actions: {
        getUsername (context, payload) {
            return mock.common('getUsername', payload)
            // return http.get('api/username')
        }
    }
})
