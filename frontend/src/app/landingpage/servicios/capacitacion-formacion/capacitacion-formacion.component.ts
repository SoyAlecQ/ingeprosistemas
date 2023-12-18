import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../../servicios/peticion.service';

@Component({
  selector: 'app-capacitacion-formacion',
  templateUrl: './capacitacion-formacion.component.html',
  styleUrl: './capacitacion-formacion.component.css'
})
export class CapacitacionFormacionComponent implements OnInit {

  constructor(private peticion: PeticionService) {

  }

  ngOnInit(): void {
    this.LoadElements()
  }

  data: any[] = []

  LoadElements() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'capacitacion/listarCliente',
      payload: {

      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)
      this.data = res
    })
  }

}
