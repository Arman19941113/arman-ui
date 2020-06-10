// node
const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

// module
const Koa = require('koa')
const koaStatic = require('koa-static')

const app = new Koa()

app.use(koaStatic(path.join('../web')))

app.use(ctx => {
    const content = fs.readFileSync('../web/arman-ui/web/index.html', 'utf-8')
    ctx.response.type = 'html'
    ctx.response.body = content
})

console.log('listen: 3000')
app.listen(3000)
execSync('open http://localhost:3000/', { stdio: 'ignore' })
