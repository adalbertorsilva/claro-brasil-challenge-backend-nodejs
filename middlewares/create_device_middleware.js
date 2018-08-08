const autoBind = require('auto-bind')
const { Device } = require('../models')
const {device_limit_exceeded_error: DeviceLimitExcedeedError} = require('../errors')
const ChangeDeviceUtils = require('../utils/change_devices_utils')

require('dotenv').config()

class CreateDeviceMiddleware {
  constructor () {
    autoBind(this)
  }

  async validateDevicesLimit (req, res, next) {
    try {
      await this.checkDevicesLimit(req.body)
      next()
    } catch (error) {
      res.status(error.status).send(this.createErrorResponseObject(error))
    }
  }

  async checkDevicesLimit (newDevice) {
    const devices = await Device.findAll({where: {user_id: newDevice.user_id}})
    this.changeDeviceUtils = new ChangeDeviceUtils(devices)

    if (devices.length === parseInt(process.env.DEVICE_LIMIT)) {
      throw new DeviceLimitExcedeedError(this.changeDeviceUtils.isChangeable())
    }
  }

  createErrorResponseObject (error) {
    const responseObject = {message: error.message}

    if (!this.changeDeviceUtils.isChangeable()) {
      responseObject.nextChangeAvaliable = this.changeDeviceUtils.getNextAvaliableChangeDate()
    }

    return responseObject
  }
}

module.exports = new CreateDeviceMiddleware()
