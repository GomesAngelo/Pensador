const Tought = require("../models/Tought")
const User = require('../models/User')

module.exports = class ToughtController{
  static async createTought(request, response){
    return response.render('Toughts/create')
  }
  static async showTought(request, response){
    return response.render('Toughts/home')
  }
}

