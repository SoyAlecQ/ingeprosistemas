const mongoose = require('mongoose')

var ventaequiposModel = {}

const Schema = mongoose.Schema

var ventaequiposSchema = new Schema({
    codigo: String,
    nombre: String,
    descripcion: String,
    precio: String,
    estado: String
})

const MyModel = mongoose.model('ventaequipos', ventaequiposSchema)

/*=============================================
=            Guardar Equipos                  =
=============================================*/

ventaequiposModel.guardar = function (post, callback) {

    const instancia = new MyModel
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre
    instancia.descripcion = post.descripcion
    instancia.precio = post.precio
    instancia.estado = post.estado

    instancia.save().then((res) => {
        console.log(res)
        return callback({ state: true, mensaje: 'Se guardó el equipo correctamente' })
    }).catch((error) => {
        return callback({ state: false, mensaje: 'Se presentó un error al guardar el equipo' + error })
    })
}

/*=============================================
=            Listar Equipos                   =
=============================================*/

ventaequiposModel.listar = function (post, callback) {
    MyModel.find({}, {}).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Listar Equipos Cliente           =
=============================================*/

ventaequiposModel.listarCliente = function (post, callback) {
    MyModel.find({ estado: 1 }, {}).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Modificar Equipos                =
=============================================*/

ventaequiposModel.modificar = function (post, callback) {
    MyModel.findByIdAndUpdate(post._id, {
        codigo: post.codigo,
        nombre: post.nombre,
        descripcion: post.descripcion,
        precio: post.precio,
        estado: post.estado
    }).then((res) => {
        console.log(res)
        callback({ state: true, mensaje: 'Se actualizó el equipo correctamente' })
    }).catch((error) => {
        callback({ state: false, mensaje: 'Este equipo no se encuentra en el sistema', error: error })
    })
}

/*=============================================
=            Eliminar Equipos            =
=============================================*/

ventaequiposModel.eliminar = function (post, callback) {
    MyModel.findByIdAndDelete(post._id).then((res) => {
        callback({ state: true, mensaje: 'Se eliminó el producto correctamente' })
    }).catch((error) => {
        callback({ state: false, mensaje: 'Este producto no existe, no se puede eliminar', error: error })
    })
}

/*=============================================
=            Listar Equipos ID            =
=============================================*/

ventaequiposModel.listarporId = function (post, callback) {
    MyModel.find({ _id: post._id }, {}).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Existencia Código            =
=============================================*/

ventaequiposModel.ExisteCodigo = function (post, callback) {
    MyModel.find({ codigo: post.codigo }, {}).then((res) => {
        console.log(res.length)
        if (res.length == 0) {
            return callback({ existe: 'No' })
        } else {
            return callback({ existe: 'Si' })
        }
    })
}

module.exports.ventaequiposModel = ventaequiposModel