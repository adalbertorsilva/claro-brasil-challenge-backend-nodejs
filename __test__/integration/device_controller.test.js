const request = require('supertest')
const app = require('../../config/server')

describe('DEVICE CONTROLLER INTEGRATION TEST', () => {
  describe('CREATE DEVICE', () => {
    describe('When post request is made with a complete payload', () => {
      it('Should return a 201 status and an object', async () => {
        const payload = {
          user_id: 999,
          device_name: 'test iphone',
          device_model: 'apple iphone'
        }

        const response = await request(app).post('/devices').send(payload)
        expect(response.status).toBe(201)
      })
    })
  })
})
