const request = require('supertest')
const server = require('../index.js')

//Everything in Jest is based on async/await, so we know we can do 
//things in the right order without weird stuff.
beforeAll(async() => {
  //do something before anything else runs
  console.log('Jest starting up!')
})

afterAll(() => {
  server.close()
  console.log("Server closed!")
})

//describe() is used to chunk a group of tests together. For example, in this 
//scenario I named it ‘basic route tests’ because I’m going to test the public routes.

describe('Basic route tests', () => {
  test('get home route GET/', async() => {
    const response = await request(server).get('/')
    expect(response.status).toEqual(200)
    expect(response.text).toContain('Hello World')
  })
})

describe('POST /encode', function() {
    test('posting an input sentence', async() => {
      const response = await request(server).post('/encode').send({ input: 'test' })
      expect(response.status).toEqual(200)
      expect(response.text).toContain('totesostot')
    })
    test('input sentence missing in body', async() => {
      const response = await request(server).post('/encode').send({ unvalidinput: '' })
      expect(response.status).toEqual(400)
      expect(response.text).toContain('required')
    })
})