import { Component } from '@angular/core';
import { PeticionService } from '../../../servicios/peticion.service';

@Component({
  selector: 'app-soporte-equipos',
  templateUrl: './soporte-equipos.component.html',
  styleUrl: './soporte-equipos.component.css'
})
export class SoporteEquiposComponent {

  constructor(private peticion: PeticionService) {

  }

  ngOnInit(): void {
      this.LoadElements()
  }

  data: any[] = []

  LoadElements() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'soporte/listarCliente',
      payload: {

      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)
      this.data = res
    })
  }

}
