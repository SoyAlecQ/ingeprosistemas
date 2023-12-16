const express = require('express')
global.app = express()

const mongoose = require('mongoose')

global.config = require('./config').config
global.nodemailer = require('nodemailer')
global.sha256 = require('sha256')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

// Cors

const cors = require('cors')
app.use(cors({
    origin: function (origin, callback) {
        console.log(origin)
        if (!origin) {
            return callback(null, true)
        }

        if (config.listablanca.indexOf(origin) === -1) {
            return callback('Error de cors', false)
        }

        return callback(null, true)
    },
}))

// Express-Sesion

const MongoStore = require('connect-mongo')

var session = require('express-session')({
    secret: config.secretsession,
    resave: true,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true, maxAge: config.timesession },
    name: config.namecookie,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/ingeprosistemascookies' })
})


app.use(session)

// Archivo Rutas

require('./routes')

//Mongoose

mongoose.connect('mongodb://127.0.0.1:27017/' + config.bdMongo).then((res) => {
    console.log('Conexión correcta a Mongo')
}).catch((error) => {
    console.log(error)
})

// Conexión a servidor

app.listen(config.puerto, () => {
    console.log(`Servidor funcionando en el puerto ${config.puerto}`)
})