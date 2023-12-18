import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../../servicios/peticion.service';

@Component({
  selector: 'app-venta-computadoras',
  templateUrl: './venta-computadoras.component.html',
  styleUrl: './venta-computadoras.component.css'
})
export class VentaComputadorasComponent implements OnInit {

  constructor(private peticion: PeticionService) {

  }

  ngOnInit(): void {
      this.LoadElements()
  }

  data: any[] = []

  LoadElements() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'ventaequipos/listarCliente',
      payload: {

      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)
      this.data = res
    })
  }

}
