/*=============================================
=            API's Usuarios            =
=============================================*/

var usuariosController = require('./APIs/controladores/usuariosController').usuariosController

app.post('/usuarios/guardar', function(request, response) {
    usuariosController.guardar(request, response)
})

app.post('/usuarios/listar', function(request, response) {
    usuariosController.listar(request, response)
})

app.post('/usuarios/modificar', function(request, response) {
    usuariosController.modificar(request, response)
})

app.post('/usuarios/eliminar', function(request, response) {
    usuariosController.eliminar(request, response)
})

app.post('/usuarios/listarporId', function(request, response) {
    usuariosController.listarporId(request, response)
})

/*=============================================
=            API's Inicio de Sesión            =
=============================================*/

app.post('/usuarios/login', function(request, response) {
    usuariosController.login(request, response)
})

/*=============================================
=                Activar Cuenta               =
=============================================*/

app.get('/activarcuenta/:email/:codigo', function(request, response) {
    usuariosController.activarcuenta(request, response)
})