const request = require('supertest')
const app = require('../../config/server')
const {Device} = require('../../models')

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

  describe('UPDATE DEVICE NAME', () => {
    describe('When post request is made with a complete payload', () => {
      it('Should return a 200 status', async () => {
        const creationPayload = {
          user_id: 111,
          device_name: 'test iphone',
          device_model: 'apple iphone'
        }

        const updatePayload = {
          device_name: 'updated test iphone'
        }

        const createdDevice = await Device.create(creationPayload)
        const response = await request(app).put(`/devices/${createdDevice.id}`).send(updatePayload)

        const loadedDevice = await Device.find({where: {id: createdDevice.id}})

        expect(response.status).toBe(200)
        expect(loadedDevice.device_name).toBe(updatePayload.device_name)
      })
    })
  })

  describe('CHANGE DEVICE', () => {
    describe('When post request is made with a complete payload', () => {
      it('Should return a 200 status and an object', async () => {
        const creationPayload = {
          user_id: 333333333,
          device_name: 'test iphone',
          device_model: 'apple iphone'
        }

        const changePayload = {
          user_id: 333333333,
          device_name: 'test android',
          device_model: 'google android'
        }

        const createdDevice = await Device.create(creationPayload)
        const response = await request(app).post(`/devices/${createdDevice.id}`).send(changePayload)

        const loadedDevice = await Device.find({where: {id: createdDevice.id}})
        expect(response.status).toBe(200)
        expect(loadedDevice).toBeNull()
        expect(response.body).toHaveProperty('id')
        // expect(loadedDevice.device_name).toBe(updatePayload.device_name)
      })
    })
  })
})
