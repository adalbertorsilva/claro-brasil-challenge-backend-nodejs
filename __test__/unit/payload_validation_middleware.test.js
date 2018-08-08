const { payload_validation_middleware: payloadValidationMiddleware } = require('../../middlewares')
const { missing_field_error: MissingFieldError } = require('../../errors')

describe('PAYLOAD VALIDATION MIDDLEWARE UNIT TEST', () => {
  describe('when a payload is sent without an user_id field', () => {
    it('should throw a MissingFieldError', async () => {
      const payload = {
        device_name: 'test iphone',
        device_model: 'apple iphone'
      }

      expect(() => { payloadValidationMiddleware.validateDevice(payload) }).toThrow(MissingFieldError)
    })
  })

  describe('when a payload is sent without an device_name field', () => {
    it('should throw a MissingFieldError', async () => {
      const payload = {
        user_id: 123,
        device_model: 'apple iphone'
      }

      expect(() => { payloadValidationMiddleware.validateDevice(payload) }).toThrow(MissingFieldError)
    })
  })

  describe('when a payload is sent without an device_model field', () => {
    it('should throw a MissingFieldError', async () => {
      const payload = {
        user_id: 123,
        device_name: 'test iphone'
      }

      expect(() => { payloadValidationMiddleware.validateDevice(payload) }).toThrow(MissingFieldError)
    })
  })
})
