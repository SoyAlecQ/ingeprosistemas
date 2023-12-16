var miHost = 'http://localhost:3000'

/*=============================================
=            Registro de Usuarios             =
=============================================*/

class HerramientasRegistro {

    mensajes = []

    Post = function (url, data, callback) {

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                return callback(JSON.parse(this.responseText))
            }
        });

        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(data);
    }

    Get = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                return callback(JSON.parse(this.responseText))
            }
        });

        xhr.open("GET", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send();
    }

    ImprimirMensajes = function (tipo, mensaje) {

        var mismensajes = document.getElementById('mismensajes')

        this.mensajes.push({ tipo: tipo, mensaje: mensaje })

        mismensajes.innerHTML = ''

        for (let a = 0; a < this.mensajes.length; a++) {
            mismensajes.innerHTML += `<div class="alert alert-${this.mensajes[a].tipo}" role="alert">
                                            ${this.mensajes[a].mensaje}
                                        </div>`
        }

        setTimeout(() => {
            this.mensajes.splice(0, 1)
            mismensajes.innerHTML = ''
            for (let a = 0; a < this.mensajes.length; a++) {
                mismensajes.innerHTML += `<div class="alert alert-${this.mensajes[a].tipo}" role="alert">
                                                ${this.mensajes[a].mensaje}
                                            </div>`
            }
        }, 5000)
    }
}

var Herramienta = new HerramientasRegistro

var registrar = function () {
    var nombres = document.getElementById('nombres').value
    var apellidos = document.getElementById('apellidos').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    var post = {
        host: miHost,
        path: '/usuarios/guardar',
        payload: `nombres=${nombres}&apellidos=${apellidos}&email=${email}&password=${password}`
    }

    Herramienta.Post(post.host + post.path, post.payload, function (respuesta) {

        if (respuesta.state == false) {
            Herramienta.ImprimirMensajes('danger', respuesta.mensaje)
        } else {
            Herramienta.ImprimirMensajes('success', respuesta.mensaje)
            setTimeout("location.href='http://localhost:4200/login'", 5000);
        }

    })
}

// /*=============================================
// =            Login de Usuarios                =
// =============================================*/

// class HerramientasLogin {

//     mensajes = []

//     Post = function (url, data, callback) {

//         var xhr = new XMLHttpRequest();
//         xhr.withCredentials = true;

//         xhr.addEventListener("readystatechange", function () {
//             if (this.readyState === 4) {
//                 return callback(JSON.parse(this.responseText))
//             }
//         });

//         xhr.open("POST", url);
//         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//         xhr.send(data);
//     }

//     Get = function (url, callback) {
//         var xhr = new XMLHttpRequest();
//         xhr.withCredentials = true;

//         xhr.addEventListener("readystatechange", function () {
//             if (this.readyState === 4) {
//                 return callback(JSON.parse(this.responseText))
//             }
//         });

//         xhr.open("GET", url);
//         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//         xhr.send();
//     }

//     ImprimirMensajes = function (tipo, mensaje) {

//         var mismensajes = document.getElementById('mismensajes')

//         this.mensajes.push({ tipo: tipo, mensaje: mensaje })

//         mismensajes.innerHTML = ''

//         for (let a = 0; a < this.mensajes.length; a++) {
//             mismensajes.innerHTML += `<div class="alert alert-${this.mensajes[a].tipo}" role="alert">
//                                             ${this.mensajes[a].mensaje}
//                                         </div>`
//         }

//         setTimeout(() => {
//             this.mensajes.splice(0, 1)
//             mismensajes.innerHTML = ''
//             for (let a = 0; a < this.mensajes.length; a++) {
//                 mismensajes.innerHTML += `<div class="alert alert-${this.mensajes[a].tipo}" role="alert">
//                                                 ${this.mensajes[a].mensaje}
//                                             </div>`
//             }
//         }, 5000)
//     }
// }

// var Herramienta = new HerramientasLogin

// var iniciarSesion = function () {

//     var email = document.getElementById('email').value
//     var password = document.getElementById('password').value

//     var post = {
//         host: miHost,
//         path: '/usuarios/login',
//         payload: `email=${email}&password=${password}`
//     }

//     Herramienta.Post(post.host + post.path, post.payload, function (respuesta) {
//         console.log(respuesta)

//         if (respuesta.state == false) {
//             Herramienta.ImprimirMensajes('danger', respuesta.mensaje)
//         } else {
//             Herramienta.ImprimirMensajes('success', respuesta.mensaje)
//             // setTimeout("location.href='http://localhost:4200/login'", 5000);
//         }

//     })
// }

/*=============================================
=            Visualizar Contraseña            =
=============================================*/

$(document).ready(function () {
    const passwordField = $('#password');
    const togglePassword = $('#togglePassword');

    togglePassword.click(function () {
        const passwordFieldType = passwordField.attr('type');

        // Toggle password visibility and update eye icon
        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            togglePassword.removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
            passwordField.attr('type', 'password');
            togglePassword.removeClass('fa-eye').addClass('fa-eye-slash');
            
        }
    });
});

$(document).ready(function () {
    const passwordField = $('#repeat-password');
    const togglePassword = $('#repeatTogglePassword');

    togglePassword.click(function () {
        const passwordFieldType = passwordField.attr('type');

        // Toggle password visibility and update eye icon
        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            togglePassword.removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
            passwordField.attr('type', 'password');
            togglePassword.removeClass('fa-eye').addClass('fa-eye-slash');
            
        }
    });
});