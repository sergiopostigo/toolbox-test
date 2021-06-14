const request = require('supertest')
const expect = require('chai').expect

const app = require('../app.js')

/**
 *  Testeo de endpoint
 */
describe('/GET /iecho?text=test', () => {
  it('responde con un json que contiene {"text" : (query parameter escrito de derecha a izquierda), "palindrome : "true" }, si se envía un request con un query parameter text cuyo contenido tiene un valor palíndromo ', async () => {
    const QUERY_PARAMETER = 'aba'
    const response = await request(app).get('/iecho?text=' + QUERY_PARAMETER)
    expect(response.status).to.eql(200)
    expect(response.body.text).to.eql(QUERY_PARAMETER.split('').reverse().join(''))
    expect(response.body.palindrome).to.eql(true)
  })

  it('responde con un json que contiene {"text" : (query parameter escrito de derecha a izquierda), "palindrome : "false" }, si se envía un request con un query parameter text cuyo contenido no tiene un valor palíndromo ', async () => {
    const QUERY_PARAMETER = 'test'
    const response = await request(app).get('/iecho?text=' + QUERY_PARAMETER)
    expect(response.status).to.eql(200)
    expect(response.body.text).to.eql(QUERY_PARAMETER.split('').reverse().join(''))
    expect(response.body.palindrome).to.eql(false)
  })

  it('responde con un json que contiene {"error" : "no text"}, si se envía un request sin query parameters', async () => {
    request(app).get('/iecho')
    const response = await request(app).get('/iecho')
    expect(response.status).to.eql(400)
    expect(response.body).to.eql({ error: 'no text' })
  })
})
