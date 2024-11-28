import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { ListasociosI } from '../../modelos/listasocios.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  socios:ListasociosI[] = [];
  token_expiration:any;
  v_refresh_token:any;
  username:any;
  password:any;

  constructor(private api:ApiService, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.api.getAllSocios().subscribe(data =>{
      this.socios = data;
    })
  }

  editarSocio(id:any){
    this.router.navigate(['editar', id]);
  }

  nuevoSocio(){
    this.router.navigate(['menulateral/nuevo']);
  }

  ValidarToken(){
    console.log('Validando el Token...');
    // Notificar si El token está por expirar
    if (this.authService.isTokenExpiringSoon()) {
      console.log('El token está por expirar. Renovando...');
      this.v_refresh_token = localStorage.getItem('refresh_token');
      this.api.refresh_tokenNode(this.v_refresh_token).subscribe({
        next: (response) => {
          if (response && response.access_token) {
            //this.token = response.access_token;
            const expiresIn = response.expires_in;
            this.token_expiration = new Date(new Date().getTime() + expiresIn * 1000);
            this.authService.saveToken(
              response.access_token, // Token del backend.
              response.expires_in,    // Tiempo en segundos desde la respuesta del backend.
              response.refresh_token
            );
    
            // Guarda los valores actualizados
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('token_expiration', this.token_expiration.toISOString());
          }
        },
        error: (error) => {
          console.error('Error al renovar el token:', error);
        }
      });
    }
  }
}
