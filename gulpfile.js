const { parallel } = require('gulp')
const { rollup } = require('rollup')
const getRollupPlugins = require('./config/rollup-plugin')
const pkg = require('./package.json')

const external = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })

// 需要打包的组件路径
const componentList = [
    'icon', 'button',
    'input', 'color-picker',
    'loading', 'popper',
]
const componentPromises = []
componentList.forEach(name => {
    componentPromises.push(rollup({
        input: `src/components/${name}/index.js`,
        external: external.concat('arman-ui/lib/icon', 'arman-ui/lib/popper'), // 组件依赖的内部组件
        plugins: getRollupPlugins('lib', name),
    }))
})

async function libTask () {
    const bundles = await Promise.all(componentPromises)

    await bundles.forEach((bundle, index) => {
        bundle.write({
            file: `arman-ui-npm/lib/${componentList[index]}/index.js`,
            format: 'esm',
        })
    })
}

async function iifeTaskSrc () {
    const bundle = await rollup({
        input: 'src/index.js',
        external: ['vue'],
        plugins: getRollupPlugins('dist_iife_src'),
    })

    await bundle.write({
        file: 'arman-ui-npm/dist/arman-ui.iife.js',
        format: 'iife',
        name: 'ArmanUI',
        globals: { vue: 'Vue' },
    })
}

async function iifeTaskMin () {
    const bundle = await rollup({
        input: 'src/index.js',
        external: ['vue'],
        plugins: getRollupPlugins('dist_iife_min'),
    })

    await bundle.write({
        file: 'arman-ui-npm/dist/arman-ui.iife.min.js',
        format: 'iife',
        name: 'ArmanUI',
        globals: { vue: 'Vue' },
    })
}

async function esmTaskSrc () {
    const bundle = await rollup({
        input: 'src/index.js',
        external: ['vue'],
        plugins: getRollupPlugins('dist_esm_src'),
    })

    await bundle.write({
        file: 'arman-ui-npm/dist/arman-ui.esm.js',
        format: 'esm',
    })
}

async function esmTaskMin () {
    const bundle = await rollup({
        input: 'src/index.js',
        external: ['vue'],
        plugins: getRollupPlugins('dist_esm_min'),
    })

    await bundle.write({
        file: 'arman-ui-npm/dist/arman-ui.esm.min.js',
        format: 'esm',
    })
}

exports.libTask = libTask
exports.distTask = parallel(iifeTaskSrc, iifeTaskMin, esmTaskSrc, esmTaskMin)
exports.default = parallel(iifeTaskSrc, iifeTaskMin, esmTaskSrc, esmTaskMin, libTask)
