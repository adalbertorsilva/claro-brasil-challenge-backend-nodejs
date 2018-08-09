const autoBind = require('auto-bind')

class DeviceBaseMiddleware {
  constructor () {
    autoBind(this)
  }

  async executeValidation (req, res, next, valitdationFunction) {
    try {
      await valitdationFunction(req)
      next()
    } catch (error) {
      res.status(error.status).send(this.createErrorResponseObject(error))
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

module.exports = DeviceBaseMiddleware
