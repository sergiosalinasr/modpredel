import { Injectable } from '@angular/core';
import { Tablacdu } from '../models/tablacdu'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TablacduService {

  url_mpd: string = environment.env_url_backend;

  constructor(private http:HttpClient) { }

  tablaCduLista():Observable<Tablacdu[]>{

    let direccion = this.url_mpd + "/cdu";
    return this.http.get<Tablacdu[]>(direccion);

  }

  putTablacdu(form:Tablacdu):Observable<any>{
    
    const url = this.url_mpd + "/cdu/" + form.id; // URL completa con el ID
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id_tdu: form.id_tdu, nombreCorto: form.nombreCorto, descripcionLarga: form.descripcionLarga };
    console.log("putTablacdu url: " + url)
    return this.http.put(url, body, { headers });
    
  }

  postTablacdu(form:Tablacdu):Observable<any>{

    const url = this.url_mpd + "/cdu/";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id_tdu: form.id_tdu, nombreCorto: form.nombreCorto, descripcionLarga: form.descripcionLarga };
    return this.http.post(url, body, { headers });

  }

  deleteTablacdu(form:Tablacdu):Observable<any>{
    
    const url = this.url_mpd + "/cdu/" + form.id; // URL completa con el ID
    return this.http.delete(url);

  }

}
