const {payload_validation_middleware: payloadValidationMiddleware} = require('../middlewares')
const {device_controller: deviceController} = require('../controllers')
module.exports = (app) => {
  app.post('/devices', payloadValidationMiddleware.validateCreateDevicePayload, deviceController.create)
}
