const sandbox = require('sinon').createSandbox()
const moment = require('moment')
const { Device } = require('../../models')
const { change_device_middleware: changeDeviceMiddleware } = require('../../middlewares')
require('dotenv').config()

afterEach(() => {
  sandbox.restore()
})

describe('CHANGE DEVICE MIDDLEWARE UNIT TEST', () => {
  describe('when a device is created and there are other three devices in the base and they were created before 30 days from current data', () => {
    it('should throw a DeviceLimitExcedeedError', async () => {
      const newDevice = {
        user_id: 123,
        device_name: 'test iphone',
        device_model: 'apple iphone',
        created_at: moment(new Date()).subtract(20, 'days').toDate()
      }

      const persistedDevices = [{...newDevice}, {...newDevice}, {...newDevice}]
      sandbox.stub(Device, 'findAll').returns(persistedDevices)

      try {
        await changeDeviceMiddleware.checkDevicesChange(newDevice)
      } catch (error) {
        expect(error.message).toBe(`Devices can't be changed at the moment`)
      }
    })
  })
})
