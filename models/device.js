'use strict'

const {Model, DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  class Device extends Model {
    static init (sequelize) {
      return super.init({
        user_id: DataTypes.INTEGER,
        device_name: DataTypes.STRING,
        device_model: DataTypes.STRING
      }, {
        sequelize,
        underscored: true
      })
    }
  }

  return Device
}
