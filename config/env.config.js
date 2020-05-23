const path = require('path')
const join = function (fragment) {
    return path.join(__dirname, '../', fragment)
}

module.exports = function (webpackEnv) {
    if (webpackEnv === 'development') {
        return {
            port: 7777,
            host: 'localhost',
        }
    } else if (webpackEnv === 'production') {
        return {
            outputPath: join('build'),
            publicPath: '/',
            useSourceMap: false,
        }
    }
}
