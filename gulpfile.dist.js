const { parallel } = require('gulp')
const { rollup } = require('rollup')
const { terser } = require('rollup-plugin-terser')
const rollupGzip = require('rollup-plugin-gzip').default
const rollupPlugins = require('./config/rollup-plugin')
const pkg = require('./package.json')

const external = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })

async function iifeTaskSrc () {
    const bundle = await rollup({
        input: 'src/iife.js',
        external,
        plugins: rollupPlugins,
    })

    await bundle.write({
        file: 'dist/arman-ui.iife.js',
        format: 'iife',
        globals: {
            vue: 'Vue',
        },
    })
}

async function iifeTaskMin () {
    const bundle = await rollup({
        input: 'src/iife.js',
        external,
        plugins: rollupPlugins.concat(
            terser(),  // minify generated es bundle.
            rollupGzip(),
        ),
    })

    await bundle.write({
        file: 'dist/arman-ui.iife.pro.js',
        format: 'iife',
        globals: {
            vue: 'Vue',
        },
    })
}

async function esmTaskSrc () {
    const bundle = await rollup({
        input: 'src/esm.js',
        external,
        plugins: rollupPlugins,
    })

    await bundle.write({
        file: 'dist/arman-ui.esm.js',
        format: 'esm',
    })
}

async function esmTaskMin () {
    const bundle = await rollup({
        input: 'src/esm.js',
        external,
        plugins: rollupPlugins.concat(
            terser(),  // minify generated es bundle.
            rollupGzip(),
        ),
    })

    await bundle.write({
        file: 'dist/arman-ui.esm.pro.js',
        format: 'esm',
    })
}

exports.iifeTaskSrc = iifeTaskSrc
exports.iifeTaskMin = iifeTaskMin
exports.esmTaskSrc = esmTaskSrc
exports.esmTaskMin = esmTaskMin
exports.default = parallel(iifeTaskSrc, iifeTaskMin, esmTaskSrc, esmTaskMin)
