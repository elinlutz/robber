// The whole framework is built on async/await
// It brings practically nothing other than basic routing, so that makes it incredibly light-weight.
// It was built by the express people as a replacement.
// Simplest error Logging I’ve ever seen.¨

const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const koaBody = require('koa-body')

const app = new Koa()
const router = new Router()

app.use(logger())
app.use(router.routes())
app.use(router.allowedMethods())

// The REALLY nice thing about koa-router is to return something, all you have to say is ctx.body = ‘The thing I want to send’.
// En enkel microtjänst som översätter till och från rövarspråket. Komplett med Jest för tester.
// var mening = 'Detta, är en textmening.'
// var mening2 = 'Dododettotta äror enon totexoxtotmomenoninongog.'

function encoder (mening) {
  let finalsentence = []
  for (const letter of mening) {
    encodeLetter(letter, finalsentence)
  }
  console.log('Encoded sentence   -   ', finalsentence.join(''))
  return finalsentence.join('')
}

// TODO: Write decoder
function decode (mening2) {
}

// check if its a vowel, if its a vowel push it directly (otherwise add an O)
function encodeLetter (letter, finalsentence) {
  const upperLetter = letter.toUpperCase()
  if (['A', 'O', 'U', 'Å', 'E', 'I', 'Y', 'Ä', 'Ö'].indexOf(upperLetter) >= 0) {
    finalsentence.push(letter)
  } else if ([' ', '.', ','].indexOf(letter) >= 0) {
    finalsentence.push(letter)
  } else {
    finalsentence.push(letter + 'o' + letter.toLowerCase())
  }
}

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World!'
})

// POST .mening to /encode
router.post('/encode', koaBody(), (ctx, next) => {
  const body = ctx.request.body
  if (!body.input) ctx.throw(400, '.input is required')
  ctx.body = encoder(body.input)
})

// POST .mening to /decode
router.post('/decode', koaBody(), (ctx, next) => {
  const body = ctx.request.body
  if (!body.input) ctx.throw(400, '.input is required')
  ctx.body = 'Decoding your string into rövarspråket...'
})

const server = app.listen(3000)
module.exports = server
