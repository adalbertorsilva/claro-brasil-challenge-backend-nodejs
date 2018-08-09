const request = require('supertest')
const app = require('../../config/server')
const {Device} = require('../../models')
const moment = require('moment')
require('dotenv').config()

describe('CHANGE DEVICE MIDDLEWARE INTEGRATION TEST', () => {
  describe(`When post request is made with with a device for trade with a trade already made before ${process.env.DEVICE_CHANGE_WAIT_PERIOD} days`, () => {
    it('Should return a 403 status and an object', async () => {
      const createPayload = {
        user_id: 22222,
        device_name: 'test iphone',
        device_model: 'apple iphone'
      }

      const changePayload = {
        user_id: 22222,
        device_name: 'test iphone for change',
        device_model: 'apple iphone for change'
      }

      const device = await Device.create(createPayload)
      await Device.update({traded: true}, {where: {id: device.id}})

      const response = await request(app).post(`/devices/${device.id}`).send(changePayload)
      expect(response.status).toBe(403)
      expect(response.body).toHaveProperty('message', `Devices can't be changed at the moment`)
      expect(moment(response.body.nextChangeAvaliable).toDate().toDateString()).toBe(moment(device.created_at, 'DD-MM-YYYY').add(30, 'days').toDate().toDateString())
    })
  })
})
