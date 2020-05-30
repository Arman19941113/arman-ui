const { parallel } = require('gulp')
const { rollup } = require('rollup')
const { terser } = require('rollup-plugin-terser')
const rollupGzip = require('rollup-plugin-gzip').default
const rollupPlugins = require('./config/rollup-plugin')
const pkg = require('./package.json')

const external = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })

async function srcTask () {
    const bundle = await rollup({
        input: 'src/index.ts',
        external,
        plugins: rollupPlugins,
    })

    await bundle.write({
        file: 'dist/arman-ui.js',
        sourcemap: false,
        format: 'es',
        globals: {
            vue: 'Vue'
        }
    })
}

async function minTask () {
    const bundle = await rollup({
        input: 'src/index.ts',
        external,
        plugins: rollupPlugins.concat(
            terser(),  // minify generated es bundle.
            rollupGzip({
                gzipOptions: {
                    level: 9, // 最慢速度和最高压缩率
                },
            }),
        ),
    })

    await bundle.write({
        file: 'dist/arman-ui.min.js',
        sourcemap: true,
    })
}

exports.srcTask = srcTask
exports.minTask = minTask
exports.default = parallel(srcTask, minTask)
