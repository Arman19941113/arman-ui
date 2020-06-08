'use strict'

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/arman-ui.esm.min.js')
} else {
    module.exports = require('./dist/arman-ui.esm.js')
}
