
class DeviceRemovalError extends Error {
  constructor () {
    super()
    this.status = 403
    this.message = `Devices can't be removed at the moment`
  }
}

module.exports = DeviceRemovalError
