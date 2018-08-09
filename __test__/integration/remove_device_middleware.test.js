const request = require('supertest')
const app = require('../../config/server')
const {Device} = require('../../models')
const moment = require('moment')
require('dotenv').config()

describe('REMOVE DEVICE MIDDLEWARE INTEGRATION TEST', () => {
  describe(`when a device is intended to be removed and it was chaged before ${process.env.DEVICE_CHANGE_WAIT_PERIOD} days from current data`, () => {
    it('Should return a 403 status and an object', async () => {
      const createPayload = {
        user_id: 22222,
        device_name: 'test iphone',
        device_model: 'apple iphone'
      }

      const device = await Device.create(createPayload)
      await Device.update({traded: true}, {where: {id: device.id}})

      const response = await request(app).delete(`/devices/${device.id}`)
      expect(response.status).toBe(403)
      expect(response.body).toHaveProperty('nextChangeAvaliable')
      expect(response.body).toHaveProperty('message', `Devices can't be removed at the moment`)
      expect(moment(response.body.nextChangeAvaliable).toDate().toDateString()).toBe(moment(device.created_at, 'DD-MM-YYYY').add(30, 'days').toDate().toDateString())
    })
  })
})
