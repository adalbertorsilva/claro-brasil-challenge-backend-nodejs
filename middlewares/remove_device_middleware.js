const autoBind = require('auto-bind')
const { Device } = require('../models')
const {device_removal_error: DeviceRemovalError} = require('../errors')
const ChangeDeviceUtils = require('../utils/change_devices_utils')
const DeviceBaseMiddleware = require('./device_base_middleware')

require('dotenv').config()

class RemoveDeviceMiddleware extends DeviceBaseMiddleware {
  constructor () {
    super()
    autoBind(this)
  }

  async validateDeviceRemoval (req, res, next) {
    await this.executeValidation(req, res, next, this.checkDevicesRemoval)
  }

  async checkDevicesRemoval (req) {
    const device = await Device.find({where: {id: req.params.id}})
    const devices = await Device.findAll({where: {user_id: device.user_id}})
    this.changeDeviceUtils = new ChangeDeviceUtils(devices)

    if (devices.length === parseInt(process.env.DEVICE_MINIMUM_LIMIT) && !this.changeDeviceUtils.isChangeable()) {
      throw new DeviceRemovalError()
    }
  }
}

module.exports = new RemoveDeviceMiddleware()
