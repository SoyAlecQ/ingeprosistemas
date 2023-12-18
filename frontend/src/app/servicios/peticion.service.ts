import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http: HttpClient) { }

  urlLocal: String = 'http://localhost:3000/'

  Post(url: string, data: {}) {

    let promise = new Promise((resolve, reject) => {

      this.http.post(url, data).toPromise().then((res: any) => {
        console.log(res)
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
    return promise
  }

  Get(url: string) {

    let promise = new Promise((resolve, reject) => {

      this.http.get(url).toPromise().then((res: any) => {
        console.log(res)
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
    return promise
  }

  upload(file: File, url: string, inputName: string): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData()
    formData.append(inputName, file)

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json'
    })

    return this.http.request(req)
  }
}
