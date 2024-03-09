import { Injectable } from '@angular/core';
import { LoginI} from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { ListasociosI } from '../../modelos/listasocios.interface';
import { SocioI, SocioISinId } from '../../modelos/socio.interface';
import { SocioI2, SocioISinId2 } from '../../modelos/socio2.interface';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tick } from '@angular/core/testing';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //url:string = "http://solodate.es/"
  url:string = "http://localhost:4000/"
  url_club: string = "http://45.236.128.235:8000/"
  private tokenEndpoint = 'http://localhost:8081/auth/realms/master/protocol/openid-connect/token';
  //private tokenEndpoint = 'http://keycloack:8080/auth/realms/master/protocol/openid-connect/token';

  constructor(private http:HttpClient) { }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    //let direccion = this.url + "auth";
    let direccion = this.url + "auth";
    return this.http.post<ResponseI>(direccion,form);
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const body = new URLSearchParams();
    body.set('client_id', 'admin-cli');
    
    // body.set('client_secret', 'tu_client_secret'); // Descomenta si se usa un 'reino' distinto a 'master'
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');

    //return this.http.post(this.tokenEndpoint, body.toString(), { headers });
    return this.http.post(this.tokenEndpoint, body.toString(), { headers }).pipe(
      catchError(error => {
        //console.log("error.status="+error.status)
        // Aquí puedes manejar errores específicos
        // Por ejemplo, si error.status es 0 o 504, podría indicar que el endpoint no está disponible
        if (error.status === 0 || error.status === 504) {
          //console.error('El servicio de autenticación no está disponible.');
          // Puedes devolver un observable con un mensaje específico o manejarlo como prefieras
          return throwError(error);
        }
        // Reenviar el error si no es uno que estés manejando específicamente
        return throwError(error);
      })
    );
  }

  getAllSocios():Observable<ListasociosI[]>{
    let direccion = this.url_club + "socios/api/v1/socios/";
    return this.http.get<ListasociosI[]>(direccion);
  }

  getSingleSocio(id:any):Observable<SocioI>{
    let direccion = this.url_club + "socios/api/v1/socios/" + id + "/";
    return this.http.get<SocioI>(direccion);
  }

  putSocio(form:SocioI):Observable<ResponseI>{
    let direccion = this.url_club + "socios/api/v1/socios/"+form.id+"/";
    return this.http.put<any>(direccion, form);
  }

  deleteSocio(form:SocioI):Observable<ResponseI>{
    let direccion = this.url_club + "socios/api/v1/socios/"+form.id;
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body:form
    }
    return this.http.delete<ResponseI>(direccion, Options); 
  }

  postSocio(form:SocioISinId2):Observable<ResponseI>{
    console.log("En postSocio")
    console.log(form)
    let direccion = this.url_club + "socios/api/v1/socios/";
    
    return this.http.post<ResponseI>(direccion, form);
  }

}
