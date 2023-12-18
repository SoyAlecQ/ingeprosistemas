import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root', 
})
export class MensajesService {

  constructor(private router: Router) { }

  data: any[] = []

  Load(tipo: string, mensaje: string) {

    this.data.push({tipo: tipo, mensaje: mensaje})
    
    setTimeout(() => {
      this.data.splice(0, 1)
    }, 2000);
  }
}
