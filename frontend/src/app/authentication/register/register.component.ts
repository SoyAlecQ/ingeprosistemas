import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private peticion: PeticionService, private msg: MensajesService, private router: Router){

  }

  nombres: string = ''
  apellidos: string = ''
  email: string = ''
  password: string = ''

  Registrar() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'usuarios/guardar',
      payload: {
        nombres: this.nombres,
        apellidos: this.apellidos,
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
      }
    })
  }

}