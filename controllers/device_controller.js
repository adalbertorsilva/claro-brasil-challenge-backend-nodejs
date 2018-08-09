const {Device} = require('../models')
const db = require('../models')

class DeviceController {
  async create (req, res) {
    const persistedDevice = await Device.create(req.body)
    res.status(201).send(persistedDevice)
  }

  async update (req, res) {
    await Device.update(req.body, {where: {id: req.params.id}})
    res.status(200).send()
  }

  async changeDevice (req, res) {
    let persistedDevice

    await db.sequelize.transaction(async (t) => {
      await Device.destroy({where: {id: req.params.id}}, {transaction: t})
      persistedDevice = await Device.create(req.body, {transaction: t})
    })

    res.status(200).send(persistedDevice)
  }
}

module.exports = new DeviceController()
