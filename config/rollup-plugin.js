const path = require('path')
const rollupAlias = require('@rollup/plugin-alias')
const rollupResolve = require('@rollup/plugin-node-resolve').default
const rollupCommonjs = require('@rollup/plugin-commonjs')
const rollupVue = require('rollup-plugin-vue')
const rollupPostcss = require('rollup-plugin-postcss')
const rollupBabel = require('@rollup/plugin-babel').babel
const rollupCleanup = require('rollup-plugin-cleanup')

module.exports = [
    rollupAlias({
        entries: [{ find: '@', replacement: path.resolve('src') }],
    }),
    rollupResolve(),
    rollupCommonjs(), // convert CommonJS modules to ES6
    rollupVue({
        css: false, // false 将 css 单独提取, true inject in js
        template: {
            isProduction: false,
        },
    }),
    rollupPostcss({
        plugins: [
            require('postcss-import')({
                resolve: require('postcss-import-webpack-resolver')({
                    alias: { '~@': path.resolve('src') },
                }),
            }),
            require('postcss-mixins'),
            require('precss'),
            require('cssnano'),
        ],
        extract: path.resolve('dist/arman-ui.css'),
    }),
    rollupBabel({
        presets: [
            // First, we're setting "modules": false, otherwise Babel will convert our modules to CommonJS before Rollup gets a chance to do its thing
            ['@babel/preset-env', { 'modules': false }],
        ],
        plugins: ['@babel/plugin-transform-runtime'],
        babelHelpers: 'runtime', // building libraries
        exclude: ['node_modules/**'],
    }),
    rollupCleanup({
        comments: 'none',
    }),
]
