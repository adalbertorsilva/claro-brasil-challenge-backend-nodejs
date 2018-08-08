const { Device } = require('../models')
const {device_change_error: DeviceChangeError} = require('../errors')
const ChangeDeviceUtils = require('../utils/change_devices_utils')

require('dotenv').config()

class ChangeDeviceMiddleware {
  async checkDevicesChange (newDevice) {
    const changeDeviceUtils = new ChangeDeviceUtils(await Device.findAll({where: {user_id: newDevice.user_id}}))

    if (!changeDeviceUtils.isChangeable()) {
      throw new DeviceChangeError()
    }
  }
}

module.exports = new ChangeDeviceMiddleware()
