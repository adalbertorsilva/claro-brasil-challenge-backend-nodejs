const autoBind = require('auto-bind')
const { Device } = require('../models')
const {device_limit_exceeded_error: DeviceLimitExcedeedError} = require('../errors')
const ChangeDeviceUtils = require('../utils/change_devices_utils')
const DeviceBaseMiddleware = require('./device_base_middleware')

require('dotenv').config()

class CreateDeviceMiddleware extends DeviceBaseMiddleware {
  constructor () {
    super()
    autoBind(this)
  }

  async validateDevicesLimit (req, res, next) {
    await this.executeValidation(req, res, next, this.checkDevicesLimit)
  }

  async checkDevicesLimit (newDevice) {
    const devices = await Device.findAll({where: {user_id: newDevice.user_id}})
    this.changeDeviceUtils = new ChangeDeviceUtils(devices)

    if (devices.length === parseInt(process.env.DEVICE_LIMIT)) {
      throw new DeviceLimitExcedeedError(this.changeDeviceUtils.isChangeable())
    }
  }
}

module.exports = new CreateDeviceMiddleware()
