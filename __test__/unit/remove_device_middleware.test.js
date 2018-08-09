const sandbox = require('sinon').createSandbox()
const moment = require('moment')
const { Device } = require('../../models')
const { remove_device_middleware: removeDeviceMiddleware } = require('../../middlewares')
require('dotenv').config()

afterEach(() => {
  sandbox.restore()
})

describe('REMOVE DEVICE MIDDLEWARE UNIT TEST', () => {
  describe('when a device is intended to be removed and it was chaged before 30 days from current data', () => {
    it('should throw a DeviceLimitExcedeedError', async () => {
      const newDevice = {
        id: 999999,
        user_id: 123,
        device_name: 'test iphone',
        device_model: 'apple iphone',
        created_at: moment(new Date()).subtract(20, 'days').toDate()
      }

      const persistedDevices = [{...newDevice, traded: true}]
      sandbox.stub(Device, 'find').returns(persistedDevices[0])
      sandbox.stub(Device, 'findAll').returns(persistedDevices)

      let middlewareError

      const req = {}
      req.params = {}
      req.params.id = newDevice.id

      try {
        await removeDeviceMiddleware.checkDevicesRemoval(req)
      } catch (error) {
        middlewareError = error
      }
      expect(middlewareError.message).toBe(`Devices can't be removed at the moment`)
    })
  })
})
