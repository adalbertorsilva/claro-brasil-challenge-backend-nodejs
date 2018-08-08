const Device = require('../../models').Device
require('dotenv').config()

describe('DEVICE INTEGRATION TEST', () => {
  describe('when a device is created', () => {
    it('should return an object with an id, created_at and updated_at attributes besides the payload values sent', async () => {
      const payload = {
        user_id: 123,
        device_name: 'test iphone',
        device_model: 'apple iphone'
      }

      const persistedPayload = await Device.create(payload)

      expect(persistedPayload).toHaveProperty('id')
      expect(persistedPayload).toHaveProperty('created_at')
      expect(persistedPayload).toHaveProperty('updated_at')
      expect(persistedPayload).toHaveProperty('user_id', payload.user_id)
      expect(persistedPayload).toHaveProperty('device_name', payload.device_name)
      expect(persistedPayload).toHaveProperty('device_model', payload.device_model)
    })
  })

  describe(`when a new device is created but there are ${process.env.DEVICE_LIMIT} already created for the same user`, () => {
    it('should throw a DeviceLimitExcedeedError', async () => {
      const payload = {
        user_id: 123,
        device_name: 'test iphone',
        device_model: 'apple iphone'
      }

      try {
        await Promise.all([Device.create(payload), Device.create(payload), Device.create(payload), Device.create(payload)])
      } catch (error) {
        expect(error.message).toBe(`You already have ${process.env.DEVICE_LIMIT} registered devices`)
      }
    })
  })

  describe(`when a device name is updated`, () => {
    it('should return an object with the same values passed on the update payload', async () => {
      const createPayload = {
        user_id: 321,
        device_name: 'test iphone',
        device_model: 'apple iphone'
      }

      const updatePayload = {
        device_name: 'test iphone updated'
      }

      const persistedDevice = await Device.create(createPayload)
      const updatedDevice = await Device.update({
        device_name: updatePayload.device_name
      },
      {where: { id: persistedDevice.id },
        returning: true,
        plain: true})

      expect(updatedDevice[1]).toHaveProperty('device_name', updatePayload.device_name)
    })
  })
})
