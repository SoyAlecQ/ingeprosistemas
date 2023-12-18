var empleadosModel = require('../modelos/empleadosModel').empleadosModel
var empleadosController = {}

/*=============================================
=            Guardar Empleados            =
=============================================*/

empleadosController.guardar = function (request, response) {

    try {

        var post = {
            codigo: request.body.codigo,
            nombres: request.body.nombres,
            apellidos: request.body.apellidos,
            fechaNacimiento: request.body.fechaNacimiento,
            celular: request.body.celular,
            cargo: request.body.cargo,
            estado: request.body.estado
        }

        if (post.codigo == undefined || post.codigo == null || post.codigo == '') {
            response.json({ state: false, mensaje: 'El campo código es obligatorio' })
            return false
        }

        if (post.nombres == undefined || post.nombres == null || post.nombres == '') {
            response.json({ state: false, mensaje: 'El campo nombres es obligatorio' })
            return false
        }

        if (post.apellidos == undefined || post.apellidos == null || post.apellidos == '') {
            response.json({ state: false, mensaje: 'El campo apellidos es obligatorio' })
            return false
        }

        if (post.fechaNacimiento == undefined || post.fechaNacimiento == null || post.fechaNacimiento == '') {
            response.json({ state: false, mensaje: 'El campo fecha de nacimiento es obligatorio' })
            return false
        }

        if (post.celular == undefined || post.celular == null || post.celular == '') {
            response.json({ state: false, mensaje: 'El campo celular es obligatorio' })
            return false
        }

        if (post.cargo == undefined || post.cargo == null || post.cargo == '') {
            response.json({ state: false, mensaje: 'El campo cargo es obligatorio' })
            return false
        }

        if (post.estado == undefined || post.estado == null || post.estado == '') {
            response.json({ state: false, mensaje: 'El campo estado es obligatorio' })
            return false
        }

        empleadosModel.ExisteCodigo(post, function (res) {

            if (res.existe == 'No') {

                empleadosModel.guardar(post, function (respuesta) {
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
=            Listar Empleados            =
=============================================*/

empleadosController.listar = function (request, response) {
    empleadosModel.listar(null, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Modificar Empleados            =
=============================================*/

empleadosController.modificar = function (request, response) {

    var post = {
        _id: request.body._id,
        codigo: request.body.codigo,
        nombres: request.body.nombres,
        apellidos: request.body.apellidos,
        fechaNacimiento: request.body.fechaNacimiento,
        celular: request.body.celular,
        cargo: request.body.cargo,
        estado: request.body.estado
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: 'El campo id es obligatorio' })
        return false
    }

    if (post.codigo == undefined || post.codigo == null || post.codigo == '') {
        response.json({ state: false, mensaje: 'El campo código es obligatorio' })
        return false
    }

    if (post.nombres == undefined || post.nombres == null || post.nombres == '') {
        response.json({ state: false, mensaje: 'El campo nombres es obligatorio' })
        return false
    }

    if (post.apellidos == undefined || post.apellidos == null || post.apellidos == '') {
        response.json({ state: false, mensaje: 'El campo apellidos es obligatorio' })
        return false
    }

    if (post.fechaNacimiento == undefined || post.fechaNacimiento == null || post.fechaNacimiento == '') {
        response.json({ state: false, mensaje: 'El campo fecha de nacimiento es obligatorio' })
        return false
    }

    if (post.celular == undefined || post.celular == null || post.celular == '') {
        response.json({ state: false, mensaje: 'El campo celular es obligatorio' })
        return false
    }

    if (post.cargo == undefined || post.cargo == null || post.cargo == '') {
        response.json({ state: false, mensaje: 'El campo cargo es obligatorio' })
        return false
    }

    if (post.estado == undefined || post.estado == null || post.estado == '') {
        response.json({ state: false, mensaje: 'El campo estado es obligatorio' })
        return false
    }

    empleadosModel.modificar(post, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Eliminar Empleados            =
=============================================*/

empleadosController.eliminar = function (request, response) {

    var post = {
        _id: request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: 'El campo id es obligatorio' })
        return false
    }

    empleadosModel.eliminar(post, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Listar Empleados ID            =
=============================================*/

empleadosController.listarporId = function (request, response) {

    var post = {
        _id: request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: 'El campo id es obligatorio' })
        return false
    }

    empleadosModel.listarporId(post, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Subir Imágenes            =
=============================================*/

empleadosController.subirArchivo = function (request, response) {

    var post = {
        nombre: request.params.nombre
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "el campo nombre es obligatorio" })
        return false
    }

    const storage = multer.diskStorage({
        destination: (request, file, cb) => {
            cb(null, 'empleados/')
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

module.exports.empleadosController = empleadosController