var usuariosModel = require('../modelos/usuariosModel').usuariosModel
var usuariosController = {}

/*=============================================
=            Guardar Usuarios            =
=============================================*/

usuariosController.guardar = function (request, response) {

    try {

        var post = {
            nombres: request.body.nombres,
            apellidos: request.body.apellidos,
            email: request.body.email,
            password: request.body.password
        }

        if (post.nombres == undefined || post.nombres == null || post.nombres == '') {
            response.json({ state: false, mensaje: 'El campo nombre es obligatorio' })
            return false
        }

        if (post.apellidos == undefined || post.apellidos == null || post.apellidos == '') {
            response.json({ state: false, mensaje: 'El campo apellidos es obligatorio' })
            return false
        }

        if (post.email == undefined || post.email == null || post.email == '') {
            response.json({ state: false, mensaje: 'El campo email es obligatorio' })
            return false
        }

        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(post.email) == false) {
            response.json({ state: false, mensaje: 'El campo email no es valido' })
            return false
        }

        if (post.password == undefined || post.password == null || post.password == '') {
            response.json({ state: false, mensaje: 'El campo contraseña es obligatorio' })
            return false
        }

        if (post.password.length > 12) {
            response.json({ state: false, mensaje: 'La contraseña no puede ser mayor a 12 carácteres' })
            return false
        }

        if (post.password.length < 5) {
            response.json({ state: false, mensaje: 'La contraseña no puede ser menor a 5 carácteres' })
            return false
        }

        post.password = sha256(post.password + config.secretEncrypt)

        // Email no repetido
        usuariosModel.ExisteEmail(post, function (res) {

            if (res.existe == 'No') {

                post.micodigo = "IPS" + Math.floor(Math.random() * (999999 - 100000) + 100000)

                usuariosModel.guardar(post, function (respuesta) {
                    if (respuesta.state == true) {

                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            requireTLS: true,
                            secure: false,
                            auth: {
                                user: config.userGmail,
                                pass: config.passwordGmail
                            }
                        })

                        let mailOptions = {
                            from: config.userGmail,
                            to: post.email,
                            subject: 'Activación de cuenta para IngePro Sistemas',
                            html: `<!DOCTYPE html>
                            <html>
                            
                            <head>
                            
                                <meta charset="utf-8">
                                <style type="text/css">
                                    @media screen {
                                        @font-face {
                                            font-family: 'Source Sans Pro';
                                            font-style: normal;
                                            font-weight: 400;
                                            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                                        }
                            
                                        @font-face {
                                            font-family: 'Source Sans Pro';
                                            font-style: normal;
                                            font-weight: 700;
                                            src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                                        }
                                    }
                            
                                    body,
                                    table,
                                    td,
                                    a {
                                        -ms-text-size-adjust: 100%;
                                        -webkit-text-size-adjust: 100%;
                                    }
                            
                                    table,
                                    td {
                                        mso-table-rspace: 0pt;
                                        mso-table-lspace: 0pt;
                                    }
                            
                                    img {
                                        -ms-interpolation-mode: bicubic;
                                    }
                            
                                    a[x-apple-data-detectors] {
                                        font-family: inherit !important;
                                        font-size: inherit !important;
                                        font-weight: inherit !important;
                                        line-height: inherit !important;
                                        color: inherit !important;
                                        text-decoration: none !important;
                                    }
                            
                                    div[style*="margin: 16px 0;"] {
                                        margin: 0 !important;
                                    }
                            
                                    body {
                                        width: 100% !important;
                                        height: 100% !important;
                                        padding: 0 !important;
                                        margin: 0 !important;
                                    }
                            
                                    table {
                                        border-collapse: collapse !important;
                                    }
                            
                                    a {
                                        color: #1a82e2;
                                    }
                            
                                    img {
                                        height: auto;
                                        line-height: 100%;
                                        text-decoration: none;
                                        border: 0;
                                        outline: none;
                                    }
                                </style>
                            
                            </head>
                            
                            <body style="background-color: #e9ecef;">
                            
                                <div class="preheader"
                                    style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                                    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
                                </div>
                            
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" bgcolor="#e9ecef">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td align="left" bgcolor="#ffffff"
                                                        style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                                        <h1
                                                            style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px; text-align: center;">
                                                            ¡Bienvenido a IngePro Sistemas!
                                                        </h1>
                                                        <h1
                                                            style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -1px; line-height: 48px; text-align: center;">
                                                            Confirma tu correo electrónico
                                                        </h1>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" bgcolor="#e9ecef">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td align="left" bgcolor="#ffffff"
                                                        style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                                        <p style="margin: 0; text-align: center;">Gracias por elegir a IngePro Sistemas para ser su
                                                            sistema de confianza. Para activar su cuenta, haz clic en el botón rojo grande.</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" bgcolor="#ffffff">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td align="center" bgcolor="#dc3545" style="border-radius: 6px;">
                                                                                <a href="http://localhost:4200/activarcuenta/${post.email}/${post.micodigo}" target="_blank"
                                                                                    style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 700;">Activar
                                                                                    cuenta ${post.micodigo}</a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" bgcolor="#ffffff"
                                                        style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; text-align: center;">
                                                        <p style="margin: 0;">Si eso no funciona, copia y pega el siguiente enlace en tu navegador:
                                                        </p>
                                                        <p style="margin: 0;"><a href="http://localhost:4200/activarcuenta/${post.email}/${post.micodigo}"
                                                                target="_blank">http://localhost:4200/activarcuenta/${post.email}/${post.micodigo}</a></p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" bgcolor="#ffffff"
                                                        style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf; text-align: center;">
                                                        <p style="margin: 0;">Saludos,<br> IngePro Sistemas</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td align="center" bgcolor="#e9ecef"
                                                        style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                                        <p style="margin: 0;">Recibiste este correo electrónico porque recibimos una solicitud de
                                                            activación para tu cuenta. Si no solicitó activación, puede eliminar este correo
                                                            electrónico de forma segura.</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </body>
                            </html>`
                        }

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error)
                                response.json(error)
                            } else {
                                response.json({ state: true, mensaje: 'Se creó el usuario correctamente, verifica tu correo electrónico' })
                            }
                        })

                    } else {
                        response.json(respuesta)
                    }
                })
            } else {
                response.json({ state: false, mensaje: 'El email ingresado ya existe, intente con otro' })
            }
        })

    } catch (error) {
        response.json({ state: false, mensaje: 'Error inesperado', error: error })
    }
}

/*=============================================
=            Listar Usuarios            =
=============================================*/

usuariosController.listar = function (request, response) {
    usuariosModel.listar(null, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Modificar Usuarios            =
=============================================*/

usuariosController.modificar = function (request, response) {

    var post = {
        _id: request.body._id,
        nombres: request.body.nombres,
        apellidos: request.body.apellidos,
        rol: request.body.rol
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: 'El campo id es obligatorio' })
        return false
    }

    if (post.nombres == undefined || post.nombres == null || post.nombres == '') {
        response.json({ state: false, mensaje: 'El campo nombre es obligatorio' })
        return false
    }

    if (post.apellidos == undefined || post.apellidos == null || post.apellidos == '') {
        response.json({ state: false, mensaje: 'El campo apellidos es obligatorio' })
        return false
    }

    if (post.rol == undefined || post.rol == null || post.rol == '') {
        response.json({ state: false, mensaje: 'El campo rol es obligatorio' })
        return false
    }

    usuariosModel.modificar(post, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Eliminar Usuarios            =
=============================================*/

usuariosController.eliminar = function (request, response) {

    var post = {
        _id: request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: 'El campo id es obligatorio' })
        return false
    }

    usuariosModel.eliminar(post, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Listar Usuarios ID            =
=============================================*/

usuariosController.listarporId = function (request, response) {

    var post = {
        _id: request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: 'El campo id es obligatorio' })
        return false
    }

    usuariosModel.listarporId(post, function (respuesta) {
        response.json(respuesta)
    })
}

/*=============================================
=            Inicio de Sesión            =
=============================================*/

usuariosController.login = function (request, response) {

    var post = {
        email: request.body.email,
        password: request.body.password
    }

    if (post.email == undefined || post.email == null || post.email == '') {
        response.json({ state: false, mensaje: 'El campo email es obligatorio' })
        return false
    }

    if (post.password == undefined || post.password == null || post.password == '') {
        response.json({ state: false, mensaje: 'El campo contraseña es obligatorio' })
        return false
    }

    post.password = sha256(post.password + config.secretEncrypt)

    usuariosModel.EmailActivo(post, function (estado) {
        if (estado.state == false) {
            response.json({ state: false, mensaje: 'El email no es valido' })
            return false
        } else {
            if (estado.res[0].estado == 0) {
                response.json({ state: false, mensaje: 'La cuenta no está activa' })
                return false
            } else {
                usuariosModel.login(post, function (respuesta) {
                    if (respuesta.state == true) {

                        request.session._id = respuesta.res[0]._id
                        request.session.nombres = respuesta.res[0].nombres
                        request.session.apellidos = respuesta.res[0].apellidos
                        request.session.rol = respuesta.res[0].rol

                        response.json({ state: true, mensaje: 'Bienvenido: ' + respuesta.res[0].nombres + ' ' + respuesta.res[0].apellidos })
                    } else {
                        response.json({ state: true, mensaje: 'Sus credenciales no son válidas' })
                    }
                })
            }
        }
    })
}

/*=============================================
=                Activar Cuenta               =
=============================================*/

usuariosController.activarcuenta = function (request, response) {
    var post = {
        email: request.body.email,
        codigo: request.body.codigo
    }

    if (post.email == undefined || post.email == null || post.email == '') {
        response.json({ state: false, mensaje: 'El campo email es obligatorio' })
        return false
    }

    if (post.codigo == undefined || post.codigo == null || post.codigo == '') {
        response.json({ state: false, mensaje: 'El campo código es obligatorio' })
        return false
    }

    usuariosModel.BuscarCodigoActivacion(post, function (respuesta) {
        if (respuesta.state == false) {
            console.log({ state: false, mensaje: 'Email o código inválido' })
            response.json({ state: false, mensaje: 'Email o código inválido' })
            return false
        } else {
            console.log(respuesta)
            if (respuesta.estado == 1) {
                response.json({ state: true, mensaje: 'Su cuenta ya fue activada con anterioridad, puede iniciar sesión' })

            } else {
                usuariosModel.CambiarEstado(post, function (resestado) {
                    if (resestado.state == true) {
                        response.json({ state: true, mensaje: 'Su cuenta ha sido activada correctamente' })
                    } else {
                        response.json({ state: false, mensaje: 'Se presentó un error al activar la cuenta' })
                    }
                })
            }
        }
    })
}

module.exports.usuariosController = usuariosController