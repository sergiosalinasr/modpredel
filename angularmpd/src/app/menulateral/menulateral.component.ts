import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService} from '../servicios/api/api.service';
import { AlertasService } from '../servicios/alertas/alertas.service';

@Component({
  selector: 'app-menulateral',
  templateUrl: './menulateral.component.html',
  styleUrls: ['./menulateral.component.css']
})
export class MenulateralComponent {

  errorMessage: string = '';

  menuOptions = [
    //{ id: 1, title: 'Opción 1', submenu: [{ title: 'Dashboard', route: '/menulateral/dashboard' },{ title: 'Employee', route: '/menulateral/employee' }]},
    
    { id: 3, title: 'UDC', 
      submenu: [
        { title: 'Tabla TDU', route: '/menulateral/tablatdu' },
        { title: 'Tabla UDC', route: '/menulateral/tablacdu' }
      ]},

    { id: 4, title: 'Maestros',
      submenu: [
        //{ title: 'Ley', route: '/menulateral/ley' },
        { title: 'CRUD Ley', route: '/menulateral/cdley' },
        { title: 'CRUD Delito', route: '/menulateral/rddelito' },
        { title: 'CRUD Riesgo', route: '/menulateral/rdriesgo' }
      ]},
    //{ id: 5, title: 'Configuración', submenu: [{ title: 'TDU', route: '/menulateral/Tdu' },{ title: 'Subopción 5.2', route: '/option5/sub2' }]},
    
    { id: 2, title: 'menu', route: '/menu', submenu: null },
    
    { id: 6, title: 'Logout', route: null, submenu: null }
    
  ];
  
  constructor( private router:Router, private authService:AuthService, private api:ApiService, private alertas:AlertasService) {}

  activeSubmenu: number | null = null;

  toggleSubmenu(optionId: number): void {

    // Notificar si El token está por expirar
    if (this.authService.isTokenExpiringSoon()) {
      console.log('toggleSubmenu: El token está por expirar. Renovando...');
      this.authService.renewToken();
    }
    this.activeSubmenu = this.activeSubmenu === optionId ? null : optionId;
  }

  toggleSubmenuCookie(optionId: number): void {

    // Notificar si El token está por expirar
    if (this.authService.isTokenExpiringSoon()) {
      // Aquí maneja la lógica de envío del formulario, como enviarlo a un servidor
      console.log('Intentando refresh_tokenNodeCookie...');
      this.api.refresh_tokenNodeCookie().subscribe({
        next: (data) => {
          console.log("data:"+data.refresh_token);
          this.authService.saveTokenCookie(
            data.access_token, // Token del backend.
            data.expires_in    // Tiempo en segundos desde la respuesta del backend.
          );

          // configuración de la renovación del token
          console.log("login->setTokenExpiration")
          this.authService.setTokenExpiration(data.expires_in * 1000);
          
          this.alertas.showMessage('Login exitoso.', 'success');
  
          //this.router.navigate(['dashboard'])
          this.router.navigate(['menulateral'])
  
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.alertas.showMessage('Error de login en el servidor...', 'error');
          this.handleLoginError(error);
        }
      })
    }
    this.activeSubmenu = this.activeSubmenu === optionId ? null : optionId;
  }

  logout(): void {
    // Se borra el token de conexión obtenido desde Keycloak y se conduce al login
    this.authService.clearToken();

    this.router.navigate(['login'])
  }

  // Método para manejar errores de login
  handleLoginError(error: any) {
    // Aquí se personalizar el manejo de errores basado en el error recibido
    if (error.status === 0 || error.status === 504) {
      this.errorMessage = 'El servicio de autenticación no está disponible.';
      this.alertas.showSuccess(error.HttpErrorResponse, this.errorMessage);
    } else if (error.error && error.error.error_description) {
      this.errorMessage = error.error.error_description;
      this.alertas.showSuccess(error.HttpErrorResponse, this.errorMessage);
    } else {
      this.errorMessage = 'Ocurrió un error durante la autenticación.';
      this.alertas.showSuccess(error.HttpErrorResponse, this.errorMessage);
    }
  }

}


