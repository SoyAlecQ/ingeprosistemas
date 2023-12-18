import { Component, Input } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MensajesService } from '../../servicios/mensajes.service';

@Component({
  selector: 'app-subirarchivos',
  templateUrl: './subirarchivos.component.html',
  styleUrl: './subirarchivos.component.css'
})
export class SubirarchivosComponent {

  selectedFiles: any
  archivoseleccionado: any
  progress: number = 0
  nombrearchivo: string = 'Seleccionar archivo'

  @Input() fileName: string = ''

  constructor(private subirarchivos: PeticionService, private msg: MensajesService) {

  }

  SelectFile(event: any) {
    this.selectedFiles = event.target.files
    this.nombrearchivo = this.selectedFiles[0].name
  }

  upload() {
    this.progress = 0
    this.archivoseleccionado = this.selectedFiles.item(0)

    var post = {
      url: this.subirarchivos.urlLocal,
      path: 'ventaequipos/subirArchivo/' + this.fileName
    }

    this.subirarchivos.upload(this.archivoseleccionado, post.url + post.path, 'archivo').subscribe(
      (event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total)
        } else if(event instanceof HttpResponse) {
          this.msg.Load('success', event.body.mensaje)

          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      }
    )
  }

}
