/*=============================================
=           Requiere Inicio Sesión            =
=============================================*/

var requiredSession = function (request, response, next) {

    var idusuario = request.session._id

    if (idusuario == undefined || idusuario == null || idusuario == '') {
        response.json({ state: false, mensaje: 'Debe iniciar sesión' })
    } else {
        next()
    }
}

/*=============================================
=        Privilegios Administrador            =
=============================================*/

var onlyAdmin = function (request, response, next) {
    var rol = request.session.rol

    if (rol != 1) {
        response.json({ state: false, mensaje: 'Se requiere privilegios de Administrador' })
    } else {
        next()
    }
}

/*=============================================
=               API's Usuarios                =
=============================================*/

var usuariosController = require('./APIs/controladores/usuariosController').usuariosController

app.post('/usuarios/guardar', function (request, response) {
    usuariosController.guardar(request, response)
})

app.post('/usuarios/listar', requiredSession, onlyAdmin, function (request, response) {
    usuariosController.listar(request, response)
})

app.post('/usuarios/modificar', requiredSession, onlyAdmin, function (request, response) {
    usuariosController.modificar(request, response)
})

app.post('/usuarios/eliminar', requiredSession, onlyAdmin, function (request, response) {
    usuariosController.eliminar(request, response)
})

app.post('/usuarios/listarporId', requiredSession, onlyAdmin, function (request, response) {
    usuariosController.listarporId(request, response)
})

/*=============================================
=            API's Inicio de Sesión            =
=============================================*/

app.post('/usuarios/login', function (request, response) {
    usuariosController.login(request, response)
})

/*=============================================
=                Activar Cuenta               =
=============================================*/

app.post('/activarcuenta', function (request, response) {
    usuariosController.activarcuenta(request, response)
})

/*=============================================
=                Estado Sesión                =
=============================================*/

app.post('/usuarios/state', function (request, response) {
    response.json(request.session)
})

/*=============================================
=                Cerrar Sesión                =
=============================================*/

app.post('/usuarios/logout', requiredSession, function (request, response) {
    request.session.destroy()
    response.json({ state: true, mensaje: 'Sesión cerrrada correctamente' })
})