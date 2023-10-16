
module.exports = class ToughtController{
  static async showTought(request, response){

    return await response.render('Toughts/home')
  }
  
  static async dashboard(request, response){
    return response.render('toughts/dashboard')
  }
}

