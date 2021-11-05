const app = require('../src/server/server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

it('tests /test endpoint', async () => {
    const response = await request.get('/test')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!')
})