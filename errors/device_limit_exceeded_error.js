require('dotenv').config()

class DeviceLimitExcedeedError extends Error {
  constructor (canChangeDevice) {
    super()
    const canChangeDeviceMessage = `You already have ${process.env.DEVICE_LIMIT} registered devices but can change a device`
    const cantChangeDeviceMessage = `You already have ${process.env.DEVICE_LIMIT} registered devices and can't change a device`
    this.status = 422
    this.message = canChangeDevice ? canChangeDeviceMessage : cantChangeDeviceMessage
  }
}

module.exports = DeviceLimitExcedeedError
