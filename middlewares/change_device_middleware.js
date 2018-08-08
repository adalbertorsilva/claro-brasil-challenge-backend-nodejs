const { Device } = require('../models')
const {device_change_error: DeviceChangeError} = require('../errors')
const canChangeDevice = require('../utils/change_devices')

require('dotenv').config()

class ChangeDeviceMiddleware {
  async checkDevicesChange (newDevice) {
    const devices = await Device.findAll({where: {user_id: newDevice.user_id}})

    if (!canChangeDevice(devices)) {
      throw new DeviceChangeError()
    }
  }
}

module.exports = new ChangeDeviceMiddleware()
