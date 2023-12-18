const mongoose = require('mongoose')

var empleadosModel = {}

const Schema = mongoose.Schema

var empleadosSchema = new Schema({
    codigo: String,
    nombres: String,
    apellidos: String,
    fechaNacimiento: String,
    celular: String,
    cargo: String,
    estado: String
})

const MyModel = mongoose.model('empleados', empleadosSchema)

/*=============================================
=            Guardar Empleados                =
=============================================*/

empleadosModel.guardar = function (post, callback) {

    const instancia = new MyModel
    instancia.codigo = post.codigo
    instancia.nombres = post.nombres
    instancia.apellidos = post.apellidos
    instancia.fechaNacimiento = post.fechaNacimiento
    instancia.celular = post.celular
    instancia.cargo = post.cargo
    instancia.estado = post.estado

    instancia.save().then((res) => {
        console.log(res)
        return callback({ state: true, mensaje: 'Se guardó el empleado correctamente' })
    }).catch((error) => {
        return callback({ state: false, mensaje: 'Se presentó un error al guardar el empleado' + error })
    })
}

/*=============================================
=            Listar Empleados                   =
=============================================*/

empleadosModel.listar = function (post, callback) {
    MyModel.find({}, {}).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Modificar Empleados              =
=============================================*/

empleadosModel.modificar = function (post, callback) {
    MyModel.findByIdAndUpdate(post._id, {
        codigo: post.codigo,
        nombres: post.nombres,
        apellidos: post.apellidos,
        fechaNacimiento: post.fechaNacimiento,
        celular: post.celular,
        cargo: post.cargo,
        estado: post.estado
    }).then((res) => {
        console.log(res)
        callback({ state: true, mensaje: 'Se actualizó el empleado correctamente' })
    }).catch((error) => {
        callback({ state: false, mensaje: 'Este empleado no se encuentra en el sistema', error: error })
    })
}

/*=============================================
=            Eliminar Empleados               =
=============================================*/

empleadosModel.eliminar = function (post, callback) {
    MyModel.findByIdAndDelete(post._id).then((res) => {
        callback({ state: true, mensaje: 'Se eliminó el empleado correctamente' })
    }).catch((error) => {
        callback({ state: false, mensaje: 'Este empleado no existe, no se puede eliminar', error: error })
    })
}

/*=============================================
=            Listar Empleados ID              =
=============================================*/

empleadosModel.listarporId = function (post, callback) {
    MyModel.find({ _id: post._id }, {}).then((res) => {
        return callback(res)
    })
}

/*=============================================
=            Existencia Código            =
=============================================*/

empleadosModel.ExisteCodigo = function (post, callback) {
    MyModel.find({ codigo: post.codigo }, {}).then((res) => {
        console.log(res.length)
        if (res.length == 0) {
            return callback({ existe: 'No' })
        } else {
            return callback({ existe: 'Si' })
        }
    })
}

module.exports.empleadosModel = empleadosModel