import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';

import { ListasociosI } from '../../modelos/listasocios.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  socios:ListasociosI[] = [];

  constructor(private api:ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.getAllSocios().subscribe(data =>{
      this.socios = data;
    })
  }

  editarSocio(id:any){
    this.router.navigate(['editar', id]);
  }

  nuevoSocio(){
    this.router.navigate(['nuevo']);
  }
}
