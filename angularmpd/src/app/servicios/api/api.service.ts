import { Injectable } from '@angular/core';
import { LoginI} from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tick } from '@angular/core/testing';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost:4000/"
  url_club: string = "http://45.236.128.235:8000/"
  private tokenEndpoint = 'http://localhost:8081/auth/realms/master/protocol/openid-connect/token';
  private nodetokenEndpoint = 'http://localhost:3000/login';
  private noderefresh_tokenEndpoint = 'http://localhost:3000/refreshtoken';
  private sigUpNodeEndpoint = 'http://localhost:3000/SignUp';
  private keycloakUrl = "http://localhost:8081/auth"
  private realm = "master"
  private nodetokenEndpointcookie = 'http://localhost:3000/logincookie';

  constructor(private http:HttpClient) { }


  // este servicio en vez de acceder directamente a Keycloak, lo hace a através de un servicio node que si accede a keycloak
  loginNode(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify({
      username: username,
      password: password
    });

    return this.http.post(this.nodetokenEndpoint, body, { headers }).pipe(
      catchError(error => {
        console.log("Angular - error.status="+error.status)
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

  // este servicio refresca el actual token
  refresh_tokenNode( refresh_token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify({
      refresh_token: refresh_token
    });

    return this.http.post(this.noderefresh_tokenEndpoint, body, { headers }).pipe(
      catchError(error => {
        console.log("Angular - error.status="+error.status)
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

  // este servicio en vez de acceder directamente a Keycloak, lo hace a através de un servicio node que si accede a keycloak
  signUpNode(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify({
      username: username,
      password: password
    });

    return this.http.post(this.sigUpNodeEndpoint, body, { headers }).pipe(
      catchError(error => {
        console.log("Angular - error.status="+error.status)
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

  // Token con cookie

  // este servicio en vez de acceder directamente a Keycloak, lo hace a através de un servicio node que si accede a keycloak
  loginNodeCookie(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify({
      username: username,
      password: password
    });

    return this.http.post(this.nodetokenEndpointcookie, body, { headers }).pipe(
      catchError(error => {
        console.log("Angular - error.status="+error.status)
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

}
