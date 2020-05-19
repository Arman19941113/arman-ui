declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const component: ComponentOptions
    export default component
}

declare var SITE_URL: string
declare var AJAX_URL: string
