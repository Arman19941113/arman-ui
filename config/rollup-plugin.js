const path = require('path')
const rollupAlias = require('@rollup/plugin-alias')
const rollupResolve = require('@rollup/plugin-node-resolve').default
const rollupCommonjs = require('@rollup/plugin-commonjs')
const rollupVue = require('rollup-plugin-vue')
const rollupPostcss = require('rollup-plugin-postcss')
const rollupBabel = require('@rollup/plugin-babel').babel
const rollupCleanup = require('rollup-plugin-cleanup')
const { terser } = require('rollup-plugin-terser')
const rollupGzip = require('rollup-plugin-gzip').default

const basePostcssPlugins = [
    require('postcss-import')({
        resolve: require('postcss-import-webpack-resolver')({
            alias: { '~@': path.resolve('src') },
        }),
    }),
    require('postcss-mixins'),
    require('precss'),
]

module.exports = function (type, name) {
    return [
        rollupAlias({
            // type === 'lib' 按需打包时组件引用了其他组件按 external 处理
            // type !== 'lib' 全部打包时找到本地文件复用
            entries: type === 'lib' ? [{ find: '@', replacement: path.resolve('src') }] : [
                { find: '@', replacement: path.resolve('src') },
                { find: 'arman-ui/lib', replacement: path.resolve('src/components') },
            ],
        }),
        rollupResolve(),
        rollupCommonjs(), // convert CommonJS modules to ES6
        rollupVue({
            css: false, // false 将 css 单独提取, true inject in js
            template: {
                isProduction: false,
            },
        }),
        type === 'lib' && rollupPostcss({
            plugins: basePostcssPlugins.concat(require('stylefmt')),
            extract: path.resolve(`arman-ui-npm/lib/${name}/style.css`),
        }),
        type === 'dist_iife_src' && rollupPostcss({
            plugins: basePostcssPlugins.concat(require('stylefmt')),
            extract: path.resolve('arman-ui-npm/dist/arman-ui.css'),
        }),
        type === 'dist_iife_min' && rollupPostcss({
            plugins: basePostcssPlugins.concat(require('cssnano')),
            extract: path.resolve('arman-ui-npm/dist/arman-ui.min.css'),
        }),
        type.includes('dist_esm') && rollupPostcss({ inject: false }), // esm 不打包 css 以避免重复打包 css 文件
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
        type.includes('min') && terser(),  // minify generated es bundle.
        type.includes('min') && rollupGzip(),
    ].filter(Boolean)
}
