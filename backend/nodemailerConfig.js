const nodemailer = require('nodemailer');
const { default: Swal } = require('sweetalert2');

const envioCorreo = (req, res) => {

    let body = req.body;

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
        to: config.userGmail,
        subject: body.asunto,
        html: `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Correo de Contacto</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
        
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
        
            h2 {
              text-align: center;
            }
        
            p {
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
        
          <div class="container">
            <h2>Contacto</h2>
            <p>Hola IngePro Sistemas,</p>
            <p>Has recibido un mensaje de <strong>${body.nombre}</strong> con el siguiente mensaje:</p>
            <p>${body.mensaje}</p>
            <p>Correo electrónico del remitente: <strong>${body.email}</strong></p>
          </div>
        
        </body>
        </html>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            response.json(error)
        } else {
            res.status(200).json({ mensaje: '¡Correo enviado con éxito!' });
        }
    })
}

module.exports = envioCorreo;