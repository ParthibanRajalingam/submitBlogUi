import { Injectable } from '@angular/core';
import { Response,Headers } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

  tempUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public uploadFile(fileToUpload: File) {
  const _formData = new FormData();
  _formData.append('file', fileToUpload, fileToUpload.name);
  return this.http.post(this.tempUrl + '/upload',_formData);
  // note: no HttpHeaders passed as 3d param to POST!
                                           // So no Content-Type constructed manually.
                                           // Angular 4.x-6.x does it automatically.
}

  public getCategories() {

  return this.http.get(this.tempUrl + '/categories');
  // note: no HttpHeaders passed as 3d param to POST!
                                           // So no Content-Type constructed manually.
                                           // Angular 4.x-6.x does it automatically.
}

  public postBlog(data) {

  return this.http.post(this.tempUrl + '/blog', data);
  // note: no HttpHeaders passed as 3d param to POST!
                                           // So no Content-Type constructed manually.
                                           // Angular 4.x-6.x does it automatically.
}
}
