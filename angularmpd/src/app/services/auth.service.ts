import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { ApiService } from '../servicios/api/api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private refreshToken: string | null = localStorage.getItem('refresh_token');
  private tokenUrl = 'http://localhost:8081/auth/realms/master/protocol/openid-connect/token';
  private token_expiration : any = 0;
  v_refresh_token:any;
  private refreshInterval: Subscription | null = null;

  constructor(private http: HttpClient, private router:Router, private api: ApiService) {}

  renewToken(): Observable<any> {
    const body = new URLSearchParams({
      client_id: 'admin-cli',
      grant_type: 'refresh_token',
      refresh_token: this.refreshToken!,
    });
    console.log('renewToken:  Renovando el token directo en keycloak...');
    return this.http.post<any>(this.tokenUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
  
  

  logoutx() {
    console.log("auth.service > logout > localStorage.removeItem('refresh_token')")
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  setTokenExpiration(expiration: number) {
    console.log("auth.service > setTokenExpiration1");
    setTimeout(() => {
      /*
      this.renewToken().subscribe({
        next: (response: any) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          console.log("auth.service > setTokenExpiration2");
          this.setTokenExpiration(response.expires_in * 1000); // Renueva automáticamente
        },
        */
        this.v_refresh_token = localStorage.getItem('refresh_token');
        this.api.refresh_tokenNode(this.v_refresh_token).subscribe({
          next: (response) => {
            if (response && response.access_token) {
              //this.token = response.access_token;
              const expiresIn = response.expires_in;
              this.token_expiration = new Date(new Date().getTime() + expiresIn * 1000);
              this.saveToken(
                response.access_token, // Token del backend.
                response.expires_in,    // Tiempo en segundos desde la respuesta del backend.
                response.refresh_token
              );
      
              // Guarda los valores actualizados
              //localStorage.setItem('token', response.access_token);
              localStorage.setItem('token_expiration', this.token_expiration.toISOString());

              this.setTokenExpiration(response.expires_in * 1000); // Renueva automáticamente
            }
          },
        error: () => {
          this.logoutx(); // Si falla la renovación, redirige al login
        },
      });
    }, expiration - 5000); // Renueva el token 5 segundos antes de expirar
  }

  /**
   * Obtiene el token almacenado en localStorage.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Verifica si el token ha expirado.
   * @returns true si el token ha expirado, false en caso contrario.
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      console.log("auth.service.ts: el token no existe!")
      return true; // No hay token, entonces está "expirado".
    }

    //const expiresAt = Number(localStorage.getItem('expires_in')); // Almacena la expiración al obtener el token.
    const expiresAt = Number(localStorage.getItem('expirationDate')); // Recupera la fechaHora de expiración del token
    console.log("isTokenExpired: expiesAt: " + expiresAt + "Date.now(): " + Date.now());
    return !expiresAt || Date.now() > expiresAt;
  }

  /**
   * Almacena el token y su tiempo de expiración en localStorage.
   * @param token El token recibido.
   * @param expiresIn El tiempo en segundos que el token es válido.
   */
  saveToken(token: string, 
    expires_in: number, 
    refresh_token: string): void {

    localStorage.setItem('token', token);
    const expirationDate = Date.now() + expires_in * 1000; // convierte segundos a milisegundos.
    //localStorage.setItem('expires_in', expires_in.toString());
    localStorage.setItem('expires_in', expirationDate.toString());
    localStorage.setItem('expirationDate', expirationDate.toString());
    localStorage.setItem('refresh_token', refresh_token);
  }

  saveTokenCookie(token: string, 
    expires_in: number): void {

    console.log("saveTokenCookie...");
    console.log("saveTokenCookie: expires_in: " + expires_in + " Date.now(): " + Date.now());
    localStorage.setItem('token', token);
    const expirationDate = Date.now() + expires_in * 1000; // convierte segundos a milisegundos.
    //localStorage.setItem('expires_in', expires_in.toString());
    localStorage.setItem('expires_in', expirationDate.toString());
    localStorage.setItem('expirationDate', expirationDate.toString())
    console.log("saveTokenCookie: expires_in="+expires_in+ " expirationDate.toString():"+expirationDate.toString())
    localStorage.setItem('expires_in_', expires_in.toString());
    localStorage.setItem('expirationDate_', Date.now().toString());
  }

  /**
   * Limpia el token del almacenamiento local (Logout).
   */
  clearToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('expires_in_');
    localStorage.removeItem('expirationDate_');
  }

  isTokenExpiringSoon(): boolean {
    const token = localStorage.getItem('token');
    const expires_in = localStorage.getItem('expires_in');
    if (!token) return false;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000; // Tiempo en ms
    const now = Date.now();
    console.log("expiration - now : " + (expiration - now))
    console.log("expires_in: " + expires_in)
  
    return expiration - now < 60000; // Menos de 1 minuto para expirar
  }

  isTokenExpiringSoon_(): boolean {
    const expirationDate_:any = localStorage.getItem('expirationDate_');
    const expires_in_:any = localStorage.getItem('expires_in_');
  
    return (Date.now() - expirationDate_) > expires_in_  * 1000 * 0.5; // Menos de 0.8 minuto para expirar
  }

  startTokenRefreshCheck() {
    console.log("startTokenRefreshCheck")
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe(); // Evitar múltiples intervalos
    }

    this.refreshInterval = interval(30000).subscribe(() => { // Verifica cada 30s
      if (this.isTokenExpiringSoon_()) {
        //
        console.log('startTokenRefreshCheck: Hora de refrescar token...');
        this.api.refresh_tokenNodeCookie().subscribe({
          next: (data) => {
            this.saveTokenCookie(
              data.access_token, // Token del backend.
              data.expires_in    // Tiempo en segundos desde la respuesta del backend.
            );
    
          },
          error: (error) => {
            console.error('Error de login:', error);
          }
        })
        //
      }
    });
  }
  
  logout() {
  
    this.clearToken();

    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe(); // Detener el intervalo de refresco
      this.refreshInterval = null;
    }
  }
  

}
