
class DeviceChangeError extends Error {
  constructor () {
    super()
    this.status = 403
    this.message = `Devices can't be changed at the moment`
  }
}

module.exports = DeviceChangeError
