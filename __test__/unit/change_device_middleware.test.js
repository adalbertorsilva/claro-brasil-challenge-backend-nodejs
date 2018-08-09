const sandbox = require('sinon').createSandbox()
const moment = require('moment')
const { Device } = require('../../models')
const { change_device_middleware: changeDeviceMiddleware } = require('../../middlewares')

afterEach(() => {
  sandbox.restore()
})

describe('CHANGE DEVICE MIDDLEWARE UNIT TEST', () => {
  describe(`when a device is intended to be changed but another one was before ${process.env.DEVICE_CHANGE_WAIT_PERIOD} days`, () => {
    it('should throw a DeviceChangeError', async () => {
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
        await changeDeviceMiddleware.checkDevicesChange(req)
      } catch (error) {
        middlewareError = error
      }

      expect(middlewareError.message).toBe(`Devices can't be changed at the moment`)
    })
  })
})
