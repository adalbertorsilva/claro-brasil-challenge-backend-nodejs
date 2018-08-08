const {Device} = require('../models')

class DeviceController {
  async create (req, res) {
    const persistedDevice = await Device.create(req.body)
    res.status(201).send(persistedDevice)
  }

  async update (req, res) {
    await Device.update(req.body, {where: {id: req.params.id}})
    res.status(200).send()
  }
}

module.exports = new DeviceController()
