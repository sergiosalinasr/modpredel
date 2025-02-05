import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menulateral',
  templateUrl: './menulateral.component.html',
  styleUrls: ['./menulateral.component.css']
})
export class MenulateralComponent {
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
  
  constructor( private router:Router, private authService:AuthService) {}

  activeSubmenu: number | null = null;

  toggleSubmenu(optionId: number): void {

    // Notificar si El token está por expirar
    if (this.authService.isTokenExpiringSoon()) {
      console.log('toggleSubmenu: El token está por expirar. Renovando...');
      this.authService.renewToken();
    }
    this.activeSubmenu = this.activeSubmenu === optionId ? null : optionId;
  }

  logout(): void {
    // Se borra el token de conexión obtenido desde Keycloak y se conduce al login
    this.authService.clearToken();

    this.router.navigate(['login'])
  }
}


