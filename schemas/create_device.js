const Joi = require('joi')
const {missing_field_error: MissingFieldError} = require('../errors')

const schema = Joi.object().keys({
  user_id: Joi.number().required().error(errors => { throw new MissingFieldError(errors[0].path[0]) }),
  device_name: Joi.string().required().error(errors => { throw new MissingFieldError(errors[0].path[0]) }),
  device_model: Joi.string().required().error(errors => { throw new MissingFieldError(errors[0].path[0]) })
})

module.exports = schema
