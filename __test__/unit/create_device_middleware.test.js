const sandbox = require('sinon').createSandbox()
const moment = require('moment')
const { Device } = require('../../models')
const { create_device_middleware: createDeviceMiddleware } = require('../../middlewares')
require('dotenv').config()

afterEach(() => {
  sandbox.restore()
})

describe('CREATE DEVICE MIDDLEWARE UNIT TEST', () => {
  describe('when a device is created and there are other three devices in the base and they were created before 30 days from current data', () => {
    it('should throw a DeviceLimitExcedeedError', async () => {
      const newDevice = {
        user_id: 123,
        device_name: 'test iphone',
        device_model: 'apple iphone',
        created_at: moment(new Date()).subtract(60, 'days').toDate()
      }

      const req = {}
      req.body = newDevice

      const persistedDevices = [{...newDevice}, {...newDevice}, {...newDevice}]
      sandbox.stub(Device, 'findAll').returns(persistedDevices)

      try {
        await createDeviceMiddleware.checkDevicesLimit(req)
      } catch (error) {
        expect(error.message).toBe(`You already have ${process.env.DEVICE_MAXIMUM_LIMIT} registered devices but can change a device`)
      }
    })
  })

  describe('when a device is created and there are other three devices in the base and they were created after 30 days from current data', () => {
    it('should throw a DeviceLimitExcedeedError', async () => {
      const newDevice = {
        user_id: 123,
        device_name: 'test iphone',
        device_model: 'apple iphone',
        created_at: moment(new Date()).subtract(20, 'days').toDate()
      }

      const req = {}
      req.body = newDevice

      const persistedDevices = [{...newDevice}, {...newDevice}, {...newDevice, traded: true}]
      sandbox.stub(Device, 'findAll').returns(persistedDevices)

      let middlewareError

      try {
        await createDeviceMiddleware.checkDevicesLimit(req)
      } catch (error) {
        middlewareError = error
      }

      expect(middlewareError.message).toBe(`You already have ${process.env.DEVICE_MAXIMUM_LIMIT} registered devices and can't change a device`)
    })
  })
})
