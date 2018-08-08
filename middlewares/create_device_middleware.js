const { Device } = require('../models')
const {device_limit_exceeded_error: DeviceLimitExcedeedError} = require('../errors')
const canChangeDevice = require('../utils/change_devices')

require('dotenv').config()

class CreateDeviceMiddleware {
  async checkDevicesLimit (newDevice) {
    const devices = await Device.findAll({where: {user_id: newDevice.user_id}})

    if (devices.length === parseInt(process.env.DEVICE_LIMIT)) {
      throw new DeviceLimitExcedeedError(canChangeDevice(devices))
    }
  }
}

module.exports = new CreateDeviceMiddleware()
