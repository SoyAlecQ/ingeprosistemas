import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PeticionService } from '../../../servicios/peticion.service';
import { MensajesService } from '../../../servicios/mensajes.service';
import { Subject } from 'rxjs';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {

  @ViewChild('modalRegistro') modalRegistroRef!: ElementRef;
  @ViewChild('modalEditar') modalEditarRef!: ElementRef;

  constructor(private peticion: PeticionService, private msg: MensajesService) {

  }

  codigo: string = ''
  nombres: string = ''
  apellidos: string = ''
  fechaNacimiento: string = ''
  celular: string = ''
  cargo: string = ''
  estado: string = '0'
  miId: string = ''

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>()

  ngOnInit(): void {
    this.LoadElements()

    this.dtOptions = {

      pagingType: 'full_numbers',
      dom: 'Bfrtip',
      buttons: [
        'colvis',
        'copy',
        'csv',
        'print',
        'excel',
      ],
      responsive: true,
      destroy: true
    };
  }

  data: any[] = []

  LoadElements() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'empleados/listar',
      payload: {

      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)
      this.data = res
      this.dtTrigger.next(null)
    })
  }

  modalNuevo() {
    this.miId = ''
    const modalRegistro = new Modal(this.modalRegistroRef.nativeElement);
    modalRegistro.show();
  }

  modalEdicion() {
    const modalEditar = new Modal(this.modalEditarRef.nativeElement);
    modalEditar.show();
  }

  Registrar() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'empleados/guardar',
      payload: {
        codigo: this.codigo,
        nombres: this.nombres,
        apellidos: this.apellidos,
        fechaNacimiento: this.fechaNacimiento,
        celular: this.celular,
        cargo: this.cargo,
        estado: this.estado
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)
      if (res.state == false) {
        this.msg.Load('danger', res.mensaje)
      } else {
        this.msg.Load('success', res.mensaje)
        this.LoadElements()

        const modalRegistro = new Modal(this.modalRegistroRef.nativeElement);
        modalRegistro.hide();

        location.reload();
      }
    })
  }

  EditarId(id: string) {
    this.miId = id
    let post = {
      host: this.peticion.urlLocal,
      path: 'empleados/listarporId',
      payload: {
        _id: id,
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)

      this.codigo = res[0].codigo
      this.nombres = res[0].nombres
      this.apellidos = res[0].apellidos
      this.fechaNacimiento = res[0].fechaNacimiento
      this.celular = res[0].celular
      this.cargo = res[0].cargo
      this.estado = res[0].estado

      const modalEditar = new Modal(this.modalEditarRef.nativeElement);
      modalEditar.show();
    })
  }

  Modificar() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'empleados/modificar',
      payload: {
        _id: this.miId,
        codigo: this.codigo,
        nombres: this.nombres,
        apellidos: this.apellidos,
        fechaNacimiento: this.fechaNacimiento,
        celular: this.celular,
        cargo: this.cargo,
        estado: this.estado
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)
      if (res.state == false) {
        this.msg.Load('danger', res.mensaje)
      } else {
        this.msg.Load('success', res.mensaje)
        this.LoadElements()

        setTimeout(() => {
          const modalEditar = new Modal(this.modalEditarRef.nativeElement);
          modalEditar.hide();

          location.reload();
        }, 1000);
      }
    })
  }

  Eliminar(id: string) {
    this.miId = id
    let post = {
      host: this.peticion.urlLocal,
      path: 'empleados/eliminar',
      payload: {
        _id: this.miId,
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)

      setTimeout(() => {
        location.reload();
      }, 1000);

      this.LoadElements()

    })
  }

}
