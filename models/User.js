const {DataTypes} = require("sequelize")
const db = require('./db/conn')

const User = db.define('User', {
  name:{
    Type:DataTypes.STRING,
    allowNull:false,
    require: true
  },
  email:{
    Type:DataTypes.STRING,
    allowNull:false,
    require: true
  },
  senha:{
    Type:DataTypes.STRING,
    allowNull:false,
    require: true
  },
})

module.exports = User
