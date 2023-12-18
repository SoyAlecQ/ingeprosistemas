const mongoose = require('mongoose')

var capacitacionModel = {}

const Schema = mongoose.Schema

var capacitacionSchema = new Schema({
    codigo: String,
    nombre: String,
    descripcion: String,
    precio: String,
    estado: String
})

const MyModel = mongoose.model('capacitacion', capacitacionSchema)

/*=============================================
=            Guardar Capacitación             =
=============================================*/

capacitacionModel.guardar = function (post, callback) {

    const instancia = new MyModel
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre
    instancia.descripcion = post.descripcion
    instancia.precio = post.precio
    instancia.estado = post.estado

    instancia.save().then((res) => {
        console.log(res)
        return callback({ state: true, mensaje: 'Se guardó la capacitación correctamente' })
    }).catch((error) => {
        return callback({ state: false, mensaje: 'Se presentó un error al guardar la capacitación' + error })
    })
}

/*=============================================
=            Listar Capacitación              =
=============================================*/

capacitacionModel.listar = function (post, callback) {
    MyModel.find({}, {}).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Listar Capacitación Cliente      =
=============================================*/

capacitacionModel.listarCliente = function (post, callback) {
    MyModel.find({ estado: 1 }, {}).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Modificar Capacitación           =
=============================================*/

capacitacionModel.modificar = function (post, callback) {
    MyModel.findByIdAndUpdate(post._id, {
        codigo: post.codigo,
        nombre: post.nombre,
        descripcion: post.descripcion,
        precio: post.precio,
        estado: post.estado
    }).then((res) => {
        console.log(res)
        callback({ state: true, mensaje: 'Se actualizó la capacitación correctamente' })
    }).catch((error) => {
        callback({ state: false, mensaje: 'Esta capacitación no se encuentra en el sistema', error: error })
    })
}

/*=============================================
=            Eliminar Capacitación            =
=============================================*/

capacitacionModel.eliminar = function (post, callback) {
    MyModel.findByIdAndDelete(post._id).then((res) => {
        callback({ state: true, mensaje: 'Se eliminó la capacitación correctamente' })
    }).catch((error) => {
        callback({ state: false, mensaje: 'Esta capacitación no existe, no se puede eliminar', error: error })
    })
}

/*=============================================
=            Listar Capacitación ID            =
=============================================*/

capacitacionModel.listarporId = function (post, callback) {
    MyModel.find({ _id: post._id }, {}).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Existencia Código            =
=============================================*/

capacitacionModel.ExisteCodigo = function (post, callback) {
    MyModel.find({ codigo: post.codigo }, {}).then((res) => {
        console.log(res.length)
        if (res.length == 0) {
            return callback({ existe: 'No' })
        } else {
            return callback({ existe: 'Si' })
        }
    })
}

module.exports.capacitacionModel = capacitacionModel