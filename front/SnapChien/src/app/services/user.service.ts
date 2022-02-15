import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/photos/';


  constructor(private http: HttpClient) { }

  upload(file: File, comment: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('comment', comment);

    const req = new HttpRequest('POST', `${this.baseUrl}upload`, formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  delete(image_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}`+image_id, { responseType: 'json' });
  }

  update(image_id: number, comment: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('comment', comment);

    const req = new HttpRequest('PATCH', `${this.baseUrl}`+image_id, formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

}
