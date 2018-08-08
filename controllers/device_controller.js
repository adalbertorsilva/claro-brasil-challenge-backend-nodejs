const {Device} = require('../models')

class DeviceController {
  async create (req, res) {
    const persistedDevice = await Device.create(req.body)
    res.status(201).send(persistedDevice)
  }
}

module.exports = new DeviceController()
