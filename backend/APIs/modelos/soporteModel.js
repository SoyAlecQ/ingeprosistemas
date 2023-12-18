const mongoose = require('mongoose')

var soporteModel = {}

const Schema = mongoose.Schema

var soporteSchema = new Schema({
    codigo: String,
    nombre: String,
    descripcion: String,
    precio: String,
    estado: String
})

const MyModel = mongoose.model('soporte', soporteSchema)

/*=============================================
=            Guardar Soporte                  =
=============================================*/

soporteModel.guardar = function (post, callback) {

    const instancia = new MyModel
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre
    instancia.descripcion = post.descripcion
    instancia.precio = post.precio
    instancia.estado = post.estado

    instancia.save().then((res) => {
        console.log(res)
        return callback({ state: true, mensaje: 'Se guardó el elemento correctamente' })
    }).catch((error) => {
        return callback({ state: false, mensaje: 'Se presentó un error al guardar el elemento' + error })
    })
}

/*=============================================
=            Listar Soporte                   =
=============================================*/

soporteModel.listar = function (post, callback) {
    MyModel.find({}, {}).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Listar Soporte Cliente           =
=============================================*/

soporteModel.listarCliente = function (post, callback) {
    MyModel.find({ estado: 1 }, {}).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Modificar Soporte                =
=============================================*/

soporteModel.modificar = function (post, callback) {
    MyModel.findByIdAndUpdate(post._id, {
        codigo: post.codigo,
        nombre: post.nombre,
        descripcion: post.descripcion,
        precio: post.precio,
        estado: post.estado
    }).then((res) => {
        console.log(res)
        callback({ state: true, mensaje: 'Se actualizó el elemento correctamente' })
    }).catch((error) => {
        callback({ state: false, mensaje: 'Este elemento no se encuentra en el sistema', error: error })
    })
}

/*=============================================
=            Eliminar Soporte            =
=============================================*/

soporteModel.eliminar = function (post, callback) {
    MyModel.findByIdAndDelete(post._id).then((res) => {
        callback({ state: true, mensaje: 'Se eliminó el elemento correctamente' })
    }).catch((error) => {
        callback({ state: false, mensaje: 'Este elemento no existe, no se puede eliminar', error: error })
    })
}

/*=============================================
=            Listar Soporte ID            =
=============================================*/

soporteModel.listarporId = function (post, callback) {
    MyModel.find({ _id: post._id }, {}).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Existencia Código            =
=============================================*/

soporteModel.ExisteCodigo = function (post, callback) {
    MyModel.find({ codigo: post.codigo }, {}).then((res) => {
        console.log(res.length)
        if (res.length == 0) {
            return callback({ existe: 'No' })
        } else {
            return callback({ existe: 'Si' })
        }
    })
}

module.exports.soporteModel = soporteModel