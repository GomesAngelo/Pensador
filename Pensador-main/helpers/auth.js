module.exports.checkAuth = (request, response, next)=>{
const userId = request.session.userId

    if(!userId){
        response.render('/login')
    }

    next()
}