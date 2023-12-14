const express = require('express')
global.app = express()

const { config } = require('./config')

const mongoose = require('mongoose')

global.config = require(__dirname + '/config.js').config
global.nodemailer = require('nodemailer')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

const cors = require('cors')
const error = require('mongoose/lib/error')
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

var session = require('express-session')({
    secret:config.claveoculta,
    resave: true,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true, maxAge: config.tiemposesion },
    name: config.bdMongo + 'Cookie',
    rolling: true
})

app.use(session)

mongoose.connect('mongodb://127.0.0.1:27017/' + config.bdMongo).then((res) => {
    console.log('Conexión correcta a Mongo')
}).catch((error) => {
    console.log(error)
})

require(__dirname + '/routes.js')

app.listen(config.puerto, () => {
    console.log(`Servidor funcionando en el puerto ${config.puerto}`)
})