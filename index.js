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
var encodetest = 'Totesostot'
var decodetest = 'DoDetottota äror enon totesostotmomenoninongog.., ..'

encoder(encodetest)
decoder(decodetest)

function encoder (sentence) {
  let encodedSentence = []
  for (const letter of sentence) {
    encodeLetter(letter, encodedSentence)
  }
  console.log('Encoded sentence   -   ', encodedSentence.join(''))
  return encodedSentence.join('')
}

// TODO: Write decoder
function decoder (sentence) {
  let decodedSentence = []
  if (isRobberLanguage(sentence)) {
    console.log('it is robber language')
    decodeSentence(sentence, decodedSentence)
  } else {
    console.log('Not Robber language')
    return 'Not decodable'
  }
  console.log('Decoded sentence   -   ', decodedSentence.join(''))
  return ('totestost')
}

function isRobberLanguage (sentence) {
  // ta bort alla vokaler och komman, punkter, blanksteg
  var consonants = sentence.replace(/a|o|u|å|e|i|y|ä|ö|[.,\s]/gi, '')
  for (var i = consonants.length / 2; i >= 0; i--) {
    if (consonants.charAt(0) === consonants.charAt(1)) {
      consonants = consonants.substr(2)
    } else {
      return false
    }
  }
  return true
}

function decodeSentence (sentence, finalsentence) {
  for (var n = 0; n <= sentence.length; n++) {
    var letter = sentence.charAt(n)
    const upperLetter = letter.toUpperCase()
    if (['A', 'O', 'U', 'Å', 'E', 'I', 'Y', 'Ä', 'Ö'].indexOf(upperLetter) >= 0) {
      finalsentence.push(letter)
      n = n++
    } else if (sentence.charAt(n) === sentence.charAt(n + 2)) {
      finalsentence.push(sentence.charAt(n))
      n = n + 2
    }
  }
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
  ctx.body = decoder(body.input)
})

const server = app.listen(3000)
module.exports = server
