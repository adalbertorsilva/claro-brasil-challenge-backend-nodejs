const moment = require('moment')
const autoBind = require('auto-bind')
require('dotenv').config()

class ChangeDeviceUtils {
  constructor (devices) {
    autoBind(this)
    this.devices = devices
  }

  isChangeable () {
    return this.hasAChangedDevice() === undefined
  }

  hasAChangedDevice () {
    const device = this.devices.find(device =>
      moment(device.created_at).isAfter(moment(new Date()).subtract(parseInt(process.env.DEVICE_CHANGE_WAIT_PERIOD), 'days')) && device.traded)

    return device
  }

  getNextAvaliableChangeDate () {
    const nextChangeAvaliable = this.hasAChangedDevice().created_at
    return moment(nextChangeAvaliable, 'DD-MM-YYYY').add(30, 'days').toDate()
  }
}

module.exports = ChangeDeviceUtils
