import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private peticion: PeticionService, 
    private msg: MensajesService,
    private router: Router){

  }

  email: string = ''
  password: string = ''

  iniciarSesion() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'usuarios/login',
      payload: {
        email: this.email,
        password: this.password
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)
      if (res.state == false) {
        this.msg.Load('danger', res.mensaje)
      } else {
        this.msg.Load('success', res.mensaje)

        setTimeout(() => {
          this.router.navigate(['/dashboard'])
          Swal.fire({
            title: "Bienvenido!",
            text: "Credenciales correctas",
            icon: "success",
            confirmButtonColor: "#d33",
            confirmButtonText: "Gracias"
          });
        }, 5000);
      }
    })
  }

}
