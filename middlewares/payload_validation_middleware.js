const autoBind = require('auto-bind')
const {create_device: createDeviceSchema} = require('../schemas')
const {validate} = require('joi')

class PayloadValidationMiddleware {
  constructor () {
    autoBind(this)
  }

  validateCreateDevicePayload (req, res, next) {
    try {
      this.validateDevice(req.body)
      next()
    } catch (error) {
      res.status(error.status).send({message: error.message})
    }
  }

  validateDevice (device) {
    validate(device, createDeviceSchema)
  }
}

module.exports = new PayloadValidationMiddleware()
