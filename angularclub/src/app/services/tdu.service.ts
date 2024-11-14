// tdu.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TduService {
  private baseUrl = 'http://localhost:3000/api/tdu'; // URL base de la API

  constructor(private http: HttpClient) {}

  getTdus(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getTdu(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTdu(tdu: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, tdu);
  }

  updateTdu(id: number, tdu: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, tdu);
  }

  deleteTdu(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

