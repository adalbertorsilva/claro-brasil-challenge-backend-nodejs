const request = require('supertest')
const app = require('../../config/server')

describe('PAYLOAD VALIDATION MIDDLEWARE INTEGRATION TEST', () => {
  describe('CREATE DEVICE', () => {
    describe('When post request is made without an user_id on payload', () => {
      it('Should return a 422 status and an error message', async () => {
        const payload = {
          device_name: 'test iphone',
          device_model: 'apple iphone'
        }

        const response = await request(app).post('/devices').send(payload)
        expect(response.status).toBe(422)
        expect(response.body.message).toBe('The attribute user_id is required')
      })
    })

    describe('When post request is made without an device_name on payload', () => {
      it('Should return a 422 status and an error message', async () => {
        const payload = {
          user_id: 123,
          device_model: 'apple iphone'
        }

        const response = await request(app).post('/devices').send(payload)
        expect(response.status).toBe(422)
        expect(response.body.message).toBe('The attribute device_name is required')
      })
    })

    describe('When post request is made without an device_model on payload', () => {
      it('Should return a 422 status and an error message', async () => {
        const payload = {
          user_id: 123,
          device_name: 'test iphone'
        }

        const response = await request(app).post('/devices').send(payload)
        expect(response.status).toBe(422)
        expect(response.body.message).toBe('The attribute device_model is required')
      })
    })
  })
})
