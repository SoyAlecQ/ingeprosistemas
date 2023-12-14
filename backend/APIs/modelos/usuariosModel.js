const mongoose = require('mongoose')

var usuariosModel = {}

const Schema = mongoose.Schema
var usuariosSchema = new Schema({
    nombres: String,
    apellidos: String,
    email: String,
    password: String,
    rol: Number,
    codigoact: String,
    estado: Number,
    fechaactivacion: Date,
    codrecuperacion: String,
    fechacodrecuperacion: Date
})

const MyModel = mongoose.model('usuarios', usuariosSchema)

/*=============================================
=            Guardar Usuarios            =
=============================================*/

usuariosModel.guardar = function (post, callback) {

    const instancia = new MyModel
    instancia.nombres = post.nombres
    instancia.apellidos = post.apellidos
    instancia.email = post.email
    instancia.password = post.password
    instancia.rol = 2
    instancia.codigoact = post.micodigo
    instancia.estado = 0
    const fechaActual = new Date()
    fechaActual.setHours(fechaActual.getHours() - 5)
    instancia.fechacodrecuperacion = fechaActual
    instancia.fechaactivacion = ''
    instancia.codrecuperacion = ''

    instancia.save().then((res) => {
        console.log(res)
        return callback({ state: true, mensaje: 'Se guardó el usuario correctamente' })
    }).catch((error) => {
        return callback({ state: false, mensaje: 'Se presentó un error al guardar el usuario' + error })
    })
}

/*=============================================
=            Listar Usuarios            =
=============================================*/

usuariosModel.listar = function (post, callback) {
    MyModel.find({}, { password: 0, codigoact: 0 }).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Modificar Usuarios            =
=============================================*/

usuariosModel.modificar = function (post, callback) {
    MyModel.findByIdAndUpdate(post._id, {
        nombres: post.nombres,
        apellidos: post.apellidos,
        rol: post.rol
    }).then((res) => {
        console.log(res)
        callback({ state: true, mensaje: 'Se actualizó el usuario correctamente' })
    }).catch((error) => {
        callback({ state: false, mensaje: 'Este usuario no se encuentra en el sistema', error: error })
    })
}

/*=============================================
=            Eliminar Usuarios            =
=============================================*/

usuariosModel.eliminar = function (post, callback) {
    MyModel.findByIdAndDelete(post._id).then((res) => {
        callback({ state: true, mensaje: 'Se eliminó el usuario correctamente' })
    }).catch((error) => {
        callback({ state: false, mensaje: 'Este usuario no existe, no se puede eliminar', error: error })
    })
}

/*=============================================
=            Listar Usuarios ID            =
=============================================*/

usuariosModel.listarporId = function (post, callback) {
    MyModel.find({ _id: post._id }, { password: 0, codigoact: 0 }).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Existencia Email            =
=============================================*/

usuariosModel.ExisteEmail = function (post, callback) {
    MyModel.find({ email: post.email }, {}).then((res) => {
        console.log(res.length)
        if (res.length == 0) {
            return callback({ existe: 'No' })
        } else {
            return callback({ existe: 'Si' })
        }
    })
}

/*=============================================
=            Inicio de Sesión            =
=============================================*/

usuariosModel.login = function (post, callback) {
    MyModel.find({ email: post.email, password: post.password }, { password: 0, codigoact: 0 }).then((res) => {
        if (res == 0) {
            return callback({ state: false, mensaje: 'Sus credenciales no son válidas' })
        } else {
            return callback({ state: true, mensaje: 'Bienvenido: ' + res[0].nombres })
        }
    })
}

/*=============================================
=            Email Activo                     =
=============================================*/

usuariosModel.EmailActivo = function (post, callback) {
    MyModel.find({ email: post.email }, { estado: 1 }).then((res) => {
        if (res.length > 0) {
            return callback({ state: true, res: res })
        } else {
            return callback({ state: false })
        }
    })
}

module.exports.usuariosModel = usuariosModel