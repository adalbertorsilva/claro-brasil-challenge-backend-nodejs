const moment = require('moment')
require('dotenv').config()

module.exports = (devices) => {
  const isChangeable = devices.find(device =>
    moment(device.created_at).isAfter(moment(new Date()).subtract(parseInt(process.env.DEVICE_CHANGE_WAIT_PERIOD), 'days')))

  return isChangeable === undefined
}
