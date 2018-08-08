const Joi = require('joi')
const {missing_field_error: MissingFieldError} = require('../errors')

const schema = Joi.object().keys({
  device_name: Joi.string().required().error(errors => { throw new MissingFieldError(errors[0].path[0]) })
})

module.exports = schema
