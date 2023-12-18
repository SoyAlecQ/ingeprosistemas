const multer = require('multer')

var soporteModel = require('../modelos/soporteModel').soporteModel
var soporteController = {}

/*=============================================
=            Guardar Soporte            =
=============================================*/

soporteController.guardar = function (request, response) {

    try {

        var post = {
            codigo: request.body.codigo,
            nombre: request.body.nombre,
            descripcion: request.body.descripcion,
            precio: request.body.precio,
            estado: request.body.estado
        }

        if (post.codigo == undefined || post.codigo == null || post.codigo == '') {
            response.json({ state: false, mensaje: 'El campo código es obligatorio' })
            return false
        }

        if (post.nombre == undefined || post.nombre == null || post.nombre == '') {
            response.json({ state: false, mensaje: 'El campo nombre es obligatorio' })
            return false
        }

        if (post.descripcion == undefined || post.descripcion == null || post.descripcion == '') {
            response.json({ state: false, mensaje: 'El campo descripción es obligatorio' })
            return false
        }

        if (post.precio == undefined || post.precio == null || post.precio == '') {
            response.json({ state: false, mensaje: 'El campo precio es obligatorio' })
            return false
        }

        if (post.estado == undefined || post.estado == null || post.estado == '') {
            response.json({ state: false, mensaje: 'El campo estado es obligatorio' })
            return false
        }

        soporteModel.ExisteCodigo(post, function (res) {

            if (res.existe == 'No') {

                soporteModel.guardar(post, function (respuesta) {
                    response.json(respuesta)
                })
            } else {
                response.json({ state: false, mensaje: 'El código ya existe, intente con otro' })
            }
        })
    } catch (error) {
        response.json({ state: false, mensaje: 'Error inesperado', error: error })
    }
}

/*=============================================
=            Listar Soporte            =
=============================================*/

soporteController.listar = function (request, response) {
    soporteModel.listar(null, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Listar Soporte Cliente           =
=============================================*/

soporteController.listarCliente = function (request, response) {
    soporteModel.listarCliente(null, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Modificar Soporte            =
=============================================*/

soporteController.modificar = function (request, response) {

    var post = {
        _id: request.body._id,
        codigo: request.body.codigo,
        nombre: request.body.nombre,
        descripcion: request.body.descripcion,
        precio: request.body.precio,
        estado: request.body.estado
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: 'El campo id es obligatorio' })
        return false
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == '') {
        response.json({ state: false, mensaje: 'El campo nombre es obligatorio' })
        return false
    }

    if (post.descripcion == undefined || post.descripcion == null || post.descripcion == '') {
        response.json({ state: false, mensaje: 'El campo descripción es obligatorio' })
        return false
    }

    if (post.precio == undefined || post.precio == null || post.precio == '') {
        response.json({ state: false, mensaje: 'El campo precio es obligatorio' })
        return false
    }

    if (post.estado == undefined || post.estado == null || post.estado == '') {
        response.json({ state: false, mensaje: 'El campo estado es obligatorio' })
        return false
    }

    soporteModel.modificar(post, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Eliminar Soporte            =
=============================================*/

soporteController.eliminar = function (request, response) {

    var post = {
        _id: request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: 'El campo id es obligatorio' })
        return false
    }

    soporteModel.eliminar(post, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Listar Soporte ID            =
=============================================*/

soporteController.listarporId = function (request, response) {

    var post = {
        _id: request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: 'El campo id es obligatorio' })
        return false
    }

    soporteModel.listarporId(post, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Subir Imágenes            =
=============================================*/

soporteController.subirArchivo = function (request, response) {

    var post = {
        nombre: request.params.nombre
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "el campo nombre es obligatorio" })
        return false
    }

    const storage = multer.diskStorage({
        destination: (request, file, cb) => {
            cb(null, 'soporte/')
        },
        filename: (request, file, cb) => {
            cb(null, post.nombre + '.png')
        }
    })

    const fileFilter = (request, file, cb) => {
        const extensionesSoportadas = [".jpg", ".jpeg", ".png", ".gif"]

        var ext = path.extname(file.originalname).toLocaleLowerCase()
        console.log(ext)
        console.log(extensionesSoportadas.includes(ext))

        if (extensionesSoportadas.includes(ext)) {
            cb(null, true)
        } else {
            cb({ mensaje: "Aceptamos solo los siguientes formatos: " + extensionesSoportadas.join(" | ") }, false)
        }
    }

    const upload = multer({ storage, fileFilter }).single("archivo")

    upload(request, response, function (err) {
        if (err) {
            console.log(err)
            response.json({ state: false, mensaje: err.mensaje })
        } else {
            console.log("Todo Ok")
            response.json({ state: true, mensaje: "Archivo Cargado" })
        }
    })
}

module.exports.soporteController = soporteController