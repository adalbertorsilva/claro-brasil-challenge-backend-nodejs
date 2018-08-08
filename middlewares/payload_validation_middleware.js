const autoBind = require('auto-bind')
const {create_device: createDeviceSchema,
  change_device_name: changeDeviceNameSchema} = require('../schemas')
const {validate} = require('joi')

class PayloadValidationMiddleware {
  constructor () {
    autoBind(this)
  }

  validateCreateDevicePayload (req, res, next) {
    this.executeValidation(req, res, next, this.validateDevice)
  }

  validateDeviceNameChangePayload (req, res, next) {
    this.executeValidation(req, res, next, this.validateDeviceName)
  }

  executeValidation (req, res, next, validationFunction) {
    try {
      validationFunction(req.body)
      next()
    } catch (error) {
      res.status(error.status).send({message: error.message})
    }
  }

  validateDevice (device) {
    validate(device, createDeviceSchema)
  }

  validateDeviceName (deviceName) {
    validate(deviceName, changeDeviceNameSchema)
  }
}

module.exports = new PayloadValidationMiddleware()
