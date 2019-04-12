/* eslint-env jest */

const request = require('supertest')
const server = require('../app.js')

beforeAll(async () => {
  console.log('Jest starting up!')
})

afterAll(() => {
  server.close()
  console.log('Server closed!')
})

describe('Basic route tests', () => {
  test('get home route GET/', async () => {
    const response = await request(server).get('/')
    expect(response.status).toEqual(200)
    expect(response.text).toContain('Hello World!')
  })
})

describe('POST /encode', function () {
  test('posting an input sentence', async () => {
    const response = await request(server).post('/encode').send({ input: 'Test' })
    expect(response.status).toEqual(200)
    expect(response.text).toEqual('Totesostot')
  })
  test('input sentence missing in body', async () => {
    const response = await request(server).post('/encode').send({ unvalidinput: '' })
    expect(response.status).toEqual(400)
    expect(response.text).toContain('input is required')
  })
})

describe('POST /decode', function () {
  test('posting an input sentence to be decoded', async () => {
    const response = await request(server).post('/decode').send({ input: 'Totesostot' })
    expect(response.status).toEqual(200)
    expect(response.text).toEqual('Test')
  })
  test('posting input sentence that is not robber language', async () => {
    const response = await request(server).post('/decode').send({ input: 'testotest' })
    expect(response.status).toEqual(200)
    expect(response.text).toEqual('Your sentence is not decodable. Try again.')
  })
  test('input sentence missing in body', async () => {
    const response = await request(server).post('/encode').send({ unvalidinput: '' })
    expect(response.status).toEqual(400)
    expect(response.text).toContain('input is required')
  })
})
