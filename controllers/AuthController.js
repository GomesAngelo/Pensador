const User = require('../models/User')

//criptografar a senha
const bcrypt = require('bcryptjs')

module.exports = class AuthController{
  static login(request, response){
    return response.render('auth/login')
  }

  static async loginPost(request, response){
    const {email, password} = request.body
    const user = await User.findOne({where:{email:email}})

    //1° Math User
    if (!user) {
      request.flash('message','Usuário não encontrado')
      response.redirect('auth/login')
      return
    }

    //2° Validar a senha do usuário
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) {
      request.flash('message', 'Senha inválida')
      response.render('auth/login')
      return
    }

    request.session.userId = user.id

    request.flash('message','bem vindo')

    request.session.save(()=>{
      response.redirect('/')
    })
  }
  static register(request, response){
    return response.render('auth/register')
  }

  static async registerPost(request, response){
  const {name, email, password, confirmpassword} = request.body

  if(password != confirmpassword){
    request.flash('message','As senhas não conferem, tente novamente')
    response.render('auth/register')
    return
  }


const checkedIfExists = await User.findOne({where:{email:email}})
if(checkedIfExists){
  request.flash('message', 'O e-mail já está em uso!')
  response.render('auth/register')
  return
}


  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const user = {
    name,
    email,
    password:hashedPassword
  }
  try {
   const createdUser = await User.create(user)

   request.session.userId = createdUser.id

    request.flash('message','Cadastro realizado com sucesso!')

    request.session.save(()=>{
      response.redirect('/')
    })

    return
  } catch (error) {
    console.log(error)
  }
  }


  static async logout(request, response){
    request.session.destroy()
    return response.redirect('/login')
  }
}
