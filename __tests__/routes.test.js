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
    const response = await request(server).post('/encode').send({ input: 'test' })
    expect(response.status).toEqual(200)
    expect(response.text).toContain('totesostot')
  })
  test('input sentence missing in body', async () => {
    const response = await request(server).post('/encode').send({ unvalidinput: '' })
    expect(response.status).toEqual(400)
    expect(response.text).toContain('input is required')
  })
})

describe('POST /decode', function () {
  test('posting an input sentence to be decoded', async () => {
    const response = await request(server).post('/decode').send({ input: 'totesostot' })
    expect(response.status).toEqual(200)
    expect(response.text).toContain('test')
  })
  test('posting input sentence that is not robber language', async () => {
    const response = await request(server).post('/decode').send({ input: 'testotest' })
    expect(response.status).toEqual(200)
    expect(response.text).toContain('not decodable')
  })
  test('input sentence missing in body', async () => {
    const response = await request(server).post('/encode').send({ unvalidinput: '' })
    expect(response.status).toEqual(400)
    expect(response.text).toContain('input is required')
  })
})
