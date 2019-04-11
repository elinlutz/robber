const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const koaBody = require('koa-body')

const encoder = require('./encoder')
const decoder = require('./decoder')

const app = new Koa()
const router = new Router()

app.use(logger())
app.use(router.routes())
app.use(router.allowedMethods())

router.get('/', (ctx) => {
  ctx.body = 'Hello World!'
})

router.post('/encode', koaBody(), (ctx) => {
  const body = ctx.request.body
  if (!body.input) ctx.throw(400, '.input is required')
  ctx.body = encoder.encode(body.input)
})

router.post('/decode', koaBody(), (ctx) => {
  const body = ctx.request.body
  if (!body.input) ctx.throw(400, '.input is required')
  ctx.body = decoder.decode(body.input)
})

const server = app.listen(3000)
module.exports = server
