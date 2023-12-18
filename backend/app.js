const express = require('express')
global.app = express()

const mongoose = require('mongoose')

global.config = require('./config').config
global.nodemailer = require('nodemailer')
global.sha256 = require('sha256')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

global.multer = require('multer')
global.path = require('path')

// Permitir Peticiones

app.all('*', function (req, res, next) {
    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");
    // res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');

    next();
});

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

// Conexión a BD - Mongoose

mongoose.connect('mongodb://127.0.0.1:27017/' + config.bdMongo).then((res) => {
    console.log('Conexión correcta a Mongo')
}).catch((error) => {
    console.log(error)
})

// Páginas públicas

app.use('/equipos', express.static(__dirname + '/equipos'))
app.use('/capacitacion', express.static(__dirname + '/capacitacion'))
app.use('/soporte', express.static(__dirname + '/soporte'))
app.use('/avatar', express.static(__dirname + '/avatar'))

// Conexión a servidor

app.listen(config.puerto, () => {
    console.log(`Servidor funcionando en el puerto ${config.puerto}`)
})