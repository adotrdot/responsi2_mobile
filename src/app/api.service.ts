import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  apiURL() {
    return "http://localhost/responsi2_mobile";
  }

  post(data: any, endpoint: string) {
    return this.http.post(this.apiURL() + "/" + endpoint, data);
  }

  tampil(data: any, endpoint: string) {
    return this.http.post(this.apiURL() + "/" + endpoint, data);
  }

  lihat(id: any, endpoint: string) {
    return this.http.get(this.apiURL() + "/" + endpoint + "" + id);
  }

  edit(data: any, endpoint: string) {
    return this.http.put(this.apiURL() + "/" + endpoint, data);
  }

  hapus(id: any, endpoint: string) {
    return this.http.delete(this.apiURL() + "/" + endpoint + id);
  }
}
