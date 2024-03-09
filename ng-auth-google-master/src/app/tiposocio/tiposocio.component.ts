import { Component, OnInit } from '@angular/core';
import { tiposocio } from '../models/tiposocio';

@Component({
  selector: 'app-tiposocio',
  templateUrl: './tiposocio.component.html',
  styleUrls: ['./tiposocio.component.scss']
})
export class TiposocioComponent {
  public  _tiposocio: tiposocio

  constructor(){
    this._tiposocio = new tiposocio( '', '');
  }

  ngOnInit(){
    
  }

  onSubmit(){
    console.log("Evento TipoSocio lanzado");
  }
}
