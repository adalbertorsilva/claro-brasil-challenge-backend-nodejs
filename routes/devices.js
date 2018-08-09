const {payload_validation_middleware: payloadValidationMiddleware,
  create_device_middleware: createDeviceMiddleware,
  change_device_middleware: changeDeviceMiddleware} = require('../middlewares')
const {device_controller: deviceController} = require('../controllers')
module.exports = (app) => {
  app.post('/devices', payloadValidationMiddleware.validateCreateDevicePayload, createDeviceMiddleware.validateDevicesLimit, deviceController.create)
  app.put('/devices/:id', payloadValidationMiddleware.validateDeviceNameChangePayload, deviceController.update)
  app.post('/devices/:id', payloadValidationMiddleware.validateCreateDevicePayload, changeDeviceMiddleware.validateDeviceChange, deviceController.changeDevice)
}
