import { Injectable } from '@angular/core';
import { Tablatdu } from '../models/tablatdu'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablatduService {

  url_mpd: string = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  tablaTduLista():Observable<Tablatdu[]>{
    let direccion = this.url_mpd + "/tdu";
    return this.http.get<Tablatdu[]>(direccion);
  }

}
