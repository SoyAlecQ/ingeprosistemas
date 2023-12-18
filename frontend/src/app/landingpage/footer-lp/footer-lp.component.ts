import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Notiflix from 'notiflix';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer-lp',
  templateUrl: './footer-lp.component.html',
  styleUrl: './footer-lp.component.css'
})
export class FooterLpComponent {

  datosCorreo: FormGroup

  constructor(private httpclient: HttpClient, private router: Router) {

    this.datosCorreo = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.email]),
      correo: new FormControl('', Validators.required),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required)
    })
  }

  envioCorreo() {

    Notiflix.Loading.hourglass('Enviando... Por favor espere')

    let params = {
      nombre: this.datosCorreo.value.nombre,
      email: this.datosCorreo.value.correo,
      asunto: this.datosCorreo.value.asunto,
      mensaje: this.datosCorreo.value.mensaje,
    }

    console.log(params)

    this.httpclient.post('http://localhost:3000/envio', params).subscribe(res => {
      console.log(res)

      Notiflix.Loading.remove()

      Notiflix.Report.success(
        'Enviado',
        'Pronto estaremos en contacto contigo',
        'Gracias'
      );

      this.router.navigate(['/home'])
    })
  }

}
