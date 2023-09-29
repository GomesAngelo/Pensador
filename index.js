const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')//Criar sessão do usuário
const Filestore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

conn
  .sync()
  .then(()=>{
    app.listen(3333)
  })
  .catch(()=>console.log(err))
