const autoBind = require('auto-bind')
const { Device } = require('../models')
const {device_change_error: DeviceChangeError} = require('../errors')
const ChangeDeviceUtils = require('../utils/change_devices_utils')
const DeviceBaseMiddleware = require('./device_base_middleware')

require('dotenv').config()

class ChangeDeviceMiddleware extends DeviceBaseMiddleware {
  constructor () {
    super()
    autoBind(this)
  }

  async validateDeviceChange (req, res, next) {
    await this.executeValidation(req, res, next, this.checkDevicesChange)
  }

  async checkDevicesChange (req) {
    this.changeDeviceUtils = new ChangeDeviceUtils(await Device.findAll({where: {user_id: req.body.user_id}}))

    if (!this.changeDeviceUtils.isChangeable()) {
      throw new DeviceChangeError()
    }
  }
}

module.exports = new ChangeDeviceMiddleware()
