const {payload_validation_middleware: payloadValidationMiddleware,
  create_device_middleware: createDeviceMiddleware} = require('../middlewares')
const {device_controller: deviceController} = require('../controllers')
module.exports = (app) => {
  app.post('/devices', payloadValidationMiddleware.validateCreateDevicePayload, createDeviceMiddleware.validateDevicesLimit, deviceController.create)
  app.put('/devices/:id', payloadValidationMiddleware.validateDeviceNameChangePayload, deviceController.update)
}
