import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PeticionService } from '../../../servicios/peticion.service';
import { Subject } from 'rxjs';
import { MensajesService } from '../../../servicios/mensajes.service';
import { Modal } from 'bootstrap';

declare var $: any

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  @ViewChild('modalRegistro') modalRegistroRef!: ElementRef;
  @ViewChild('modalEditar') modalEditarRef!: ElementRef;

  constructor(private peticion: PeticionService, private msg: MensajesService) {

  }

  nombres: string = ''
  apellidos: string = ''
  email: string = ''
  password: string = ''
  rol: string = '2'
  estado: string = '0'
  miId: string = ''

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>()

  ngOnInit(): void {
    this.LoadUsers()

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

  LoadUsers() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'usuarios/listar',
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
        this.LoadUsers()

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
      path: 'usuarios/listarporId',
      payload: {
        _id: id,
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)

      this.nombres = res[0].nombres
      this.apellidos = res[0].apellidos
      this.email = res[0].email
      this.rol = res[0].rol
      this.estado = res[0].estado

      const modalEditar = new Modal(this.modalEditarRef.nativeElement);
      modalEditar.show();
    })
  }

  Modificar() {
    let post = {
      host: this.peticion.urlLocal,
      path: 'usuarios/modificar',
      payload: {
        _id: this.miId,
        nombres: this.nombres,
        apellidos: this.apellidos,
        rol: this.rol,
        estado: this.estado
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)
      if (res.state == false) {
        this.msg.Load('danger', res.mensaje)
      } else {
        this.msg.Load('success', res.mensaje)
        this.LoadUsers()

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
      path: 'usuarios/eliminar',
      payload: {
        _id: this.miId,
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res)

      setTimeout(() => {
        location.reload();
      }, 1000);

      this.LoadUsers()
      
    })
  }
}
