
module.exports = class ToughtController{
  static async showTought(request, response){

    return await response.render('Toughts/home')
  }
}

