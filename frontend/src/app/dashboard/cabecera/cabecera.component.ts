import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent implements OnInit {

  constructor(private peticion: PeticionService, private router: Router){

  }

  nombres: string = 'Cargando...'
  apellidos: string = ''
  rol: string = 'Cargando...'

  ngOnInit(): void {
    this.State()
}

  State() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'usuarios/state',
      payload: {
        
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)
      this.nombres = res.nombres
      this.apellidos = res.apellidos
      this.rol = res.rol
    })
  }

  Logout() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'usuarios/logout',
      payload: {
        
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)
      
      if (res.state == true) {
        
        setTimeout(() => {
          Swal.fire("Sesión cerrada correctamente!");
          this.router.navigate(['/login'])
        }, 2000);
      }
    })
  }


}
