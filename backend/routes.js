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

app.post('/usuarios/subirArchivo/:nombre', function (request, response) {
    usuariosController.subirArchivo(request, response)
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

app.post('/usuarios/logout', function (request, response) {
    request.session.destroy()
    response.json({ state: true, mensaje: 'Sesión cerrrada correctamente' })
})

/*=============================================
=                Correo LP                =
=============================================*/

let envio = require('./nodemailerConfig')

app.post('/envio', function (request, response) {
    envio(request, response)
})

/*=============================================
=               API's Empleados                =
=============================================*/

var empleadosController = require('./APIs/controladores/empleadosController').empleadosController

app.post('/empleados/guardar', requiredSession, onlyAdmin, function (request, response) {
    empleadosController.guardar(request, response)
})

app.post('/empleados/listar', requiredSession, onlyAdmin, function (request, response) {
    empleadosController.listar(request, response)
})

app.post('/empleados/modificar', requiredSession, onlyAdmin, function (request, response) {
    empleadosController.modificar(request, response)
})

app.post('/empleados/eliminar', requiredSession, onlyAdmin, function (request, response) {
    empleadosController.eliminar(request, response)
})

app.post('/empleados/listarporId', requiredSession, onlyAdmin, function (request, response) {
    empleadosController.listarporId(request, response)
})

app.post('/empleados/subirArchivo/:nombre', function (request, response) {
    empleadosController.subirArchivo(request, response)
})

/*=============================================
=               API's Servicios                =
=============================================*/


/*----------  Venta de Equipos  ----------*/

var ventaequiposController = require('./APIs/controladores/ventaequiposController').ventaequiposController

app.post('/ventaequipos/guardar', requiredSession, onlyAdmin, function (request, response) {
    ventaequiposController.guardar(request, response)
})

app.post('/ventaequipos/listar', requiredSession, function (request, response) {
    ventaequiposController.listar(request, response)
})

app.post('/ventaequipos/listarCliente', function (request, response) {
    ventaequiposController.listarCliente(request, response)
})

app.post('/ventaequipos/modificar', requiredSession, onlyAdmin, function (request, response) {
    ventaequiposController.modificar(request, response)
})

app.post('/ventaequipos/eliminar', requiredSession, onlyAdmin, function (request, response) {
    ventaequiposController.eliminar(request, response)
})

app.post('/ventaequipos/listarporId', function (request, response) {
    ventaequiposController.listarporId(request, response)
})

app.post('/ventaequipos/subirArchivo/:nombre', function (request, response) {
    ventaequiposController.subirArchivo(request, response)
})

/*----------  Capacitación / Formación  ----------*/

var capacitacionController = require('./APIs/controladores/capacitacionController').capacitacionController

app.post('/capacitacion/guardar', requiredSession, onlyAdmin, function (request, response) {
    capacitacionController.guardar(request, response)
})

app.post('/capacitacion/listar', requiredSession, function (request, response) {
    capacitacionController.listar(request, response)
})

app.post('/capacitacion/listarCliente', function (request, response) {
    capacitacionController.listarCliente(request, response)
})

app.post('/capacitacion/modificar', requiredSession, onlyAdmin, function (request, response) {
    capacitacionController.modificar(request, response)
})

app.post('/capacitacion/eliminar', requiredSession, onlyAdmin, function (request, response) {
    capacitacionController.eliminar(request, response)
})

app.post('/capacitacion/listarporId', function (request, response) {
    capacitacionController.listarporId(request, response)
})

app.post('/capacitacion/subirArchivo/:nombre', function (request, response) {
    capacitacionController.subirArchivo(request, response)
})

/*----------  Soporte Técnico  ----------*/

var soporteController = require('./APIs/controladores/soporteController').soporteController

app.post('/soporte/guardar', requiredSession, onlyAdmin, function (request, response) {
    soporteController.guardar(request, response)
})

app.post('/soporte/listar', requiredSession, function (request, response) {
    soporteController.listar(request, response)
})

app.post('/soporte/listarCliente', function (request, response) {
    soporteController.listarCliente(request, response)
})

app.post('/soporte/modificar', requiredSession, onlyAdmin, function (request, response) {
    soporteController.modificar(request, response)
})

app.post('/soporte/eliminar', requiredSession, onlyAdmin, function (request, response) {
    soporteController.eliminar(request, response)
})

app.post('/soporte/listarporId', function (request, response) {
    soporteController.listarporId(request, response)
})

app.post('/soporte/subirArchivo/:nombre', function (request, response) {
    soporteController.subirArchivo(request, response)
})