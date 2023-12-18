import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeticionService } from '../../../../servicios/peticion.service';

@Component({
  selector: 'app-venta-detalles',
  templateUrl: './venta-detalles.component.html',
  styleUrl: './venta-detalles.component.css'
})
export class VentaDetallesComponent implements OnInit {

  constructor(private actroute: ActivatedRoute, private peticion: PeticionService) {}

  ngOnInit(): void {
      this.CargarId(this.actroute.snapshot.params['id'])      
  }

  data: any[] = []

  CargarId(id: string) {
    let post = {
      host: this.peticion.urlLocal,
      path: 'ventaequipos/listarporId',
      payload: {
        _id: id
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)
      this.data = res
    })
  }

}
