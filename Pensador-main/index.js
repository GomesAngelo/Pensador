const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')//Criar sessão do usuário
const Filestore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

//Models
const User = require("./models/User")
const Tought = require("./models/Tought")

//Rotas
const toughtsRouter = require('./routes/toughtsRouter')
const authRouters = require('./routes/authRoutes')

//controller

const ToughtController = require('./controllers/ToughtController')


const conn = require('./db/conn')
const { response } = require('express')
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Import JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//Import middleware para controle de sessões

//Import flash Messages
app.use(flash())

app.use(express.static('public'))



app.use(session({
  name: "session",
  secret: "nosso_segredo",
  resave: false,
  saveUninitialized: false,
  store: new Filestore({
    logFn: function () { },
    path: require('path').join(require('os').tmpdir(), 'sessions')
  }),
  cookie: {
    secure: false,
    maxAge: 360000,
    expires: new Date(Date.now() + 360000),
    httpOnly: true
  }
}))
//Midlleware para armazenar sessões na resposta
app.use((request, response, next) =>{
  if (request.session.userId) {
    response.locals.session = request.session
  }
  next()
})

//rotas
app.use('/toughts',toughtsRouter)
app.use('/',authRouters)

app.get('/', ToughtController.showTought)

conn
  .sync()
  .then(() => {
    app.listen(3333)
  })
  .catch(() => console.log(err))
