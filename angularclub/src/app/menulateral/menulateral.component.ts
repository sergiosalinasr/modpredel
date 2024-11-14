import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-menulateral',
  templateUrl: './menulateral.component.html',
  styleUrls: ['./menulateral.component.css']
})
export class MenulateralComponent {
  menuOptions = [
    { id: 1, title: 'Opción 1', submenu: [{ title: 'Dasuboard', route: '/dashboard' },{ title: 'Subopción 1.2', route: '/option1/sub2' }]},
    { id: 2, title: 'Opción 2', route: '/option2', submenu: null },
    { id: 3, title: 'Opción 3', submenu: [{ title: 'Subopción 3.1', route: '/option3/sub1' },{ title: 'Subopción 3.2', route: '/option3/sub2' }]},
    { id: 4, title: 'Opción 4', submenu: [{ title: 'Subopción 4.1', route: '/option4/sub1' },{ title: 'Subopción 4.2', route: '/option4/sub2' }]},
    { id: 5, title: 'Configuración', submenu: [{ title: 'Subopción 5.1', route: '/Tdu' },{ title: 'Subopción 5.2', route: '/option5/sub2' }]},
    { id: 6, title: 'Logout', route: null, submenu: null }
  ];
  
  constructor( private router:Router) {}

  activeSubmenu: number | null = null;

  toggleSubmenu(optionId: number): void {
    this.activeSubmenu = this.activeSubmenu === optionId ? null : optionId;
  }

  logout(): void {
    // Se borra el token de conexión obtenido desde Keycloak y se conduce al login
    localStorage.removeItem("token");
    this.router.navigate(['login'])
  }
}


