const { rollup } = require('rollup')
const getRollupPlugins = require('./config/rollup-plugin')
const pkg = require('./package.json')

const external = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })
external.push('arman-ui/lib/icon')

const componentList = ['icon', 'button', 'loading']
const componentPromises = []
componentList.forEach(name => {
    componentPromises.push(rollup({
        input: `src/components/${name}/index.js`,
        external,
        plugins: getRollupPlugins('lib', name),
    }))
})

exports.default = async function () {
    const bundles = await Promise.all(componentPromises)

    await bundles.forEach((bundle, index) => {
        bundle.write({
            file: `arman-ui-npm/lib/${componentList[index]}/index.js`,
            format: 'esm',
        })
    })
}
