import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent implements OnInit {

  constructor(private peticion: PeticionService){

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

}
