const request = require('supertest')
const app = require('../../config/server')
const {Device} = require('../../models')
const moment = require('moment')

describe('CREATE DEVICE MIDDLEWARE INTEGRATION TEST', () => {
  describe('CREATE EXCEEDED DEVICE', () => {
    describe('When post request is made with with a fourth device without any trade already made', () => {
      it('Should return a 403 status and an object', async () => {
        const payload = {
          user_id: 9999999,
          device_name: 'test iphone',
          device_model: 'apple iphone'
        }

        await Promise.all([Device.create(payload), Device.create(payload), Device.create(payload)])

        const response = await request(app).post('/devices').send(payload)
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message', `You already have ${process.env.DEVICE_MAXIMUM_LIMIT} registered devices but can change a device`)
      })
    })

    describe('When post request is made with with a fourth device with a trade already made', () => {
      it('Should return a 403 status and an object', async () => {
        const payload = {
          user_id: 888888888,
          device_name: 'test iphone',
          device_model: 'apple iphone'
        }

        const devices = await Promise.all([Device.create(payload), Device.create(payload), Device.create(payload)])
        await Device.update({traded: true}, {where: {id: devices[0].id}})

        const response = await request(app).post('/devices').send(payload)
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message', `You already have ${process.env.DEVICE_MAXIMUM_LIMIT} registered devices and can't change a device`)
        expect(response.body).toHaveProperty('nextChangeAvaliable')
        expect(moment(response.body.nextChangeAvaliable).toDate().toDateString()).toBe(moment(devices[0].created_at, 'DD-MM-YYYY').add(30, 'days').toDate().toDateString())
      })
    })
  })
})
