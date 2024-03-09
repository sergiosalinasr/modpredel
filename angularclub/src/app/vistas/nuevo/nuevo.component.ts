import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocioISinId, SocioI } from '../../modelos/socio.interface';
import { SocioISinId2, SocioI2 } from '../../modelos/socio2.interface';
import { ApiService } from '../../servicios/api/api.service';
import { ResponseI} from '../../modelos/response.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent {
  

  constructor(private api:ApiService, private router:Router, private alert:AlertasService){}

  formx: SocioISinId2 = {
    nombres: "Irina13",
    apePaterno: "Karamanos",
    apeMaterno: "Font",
    correo: "irinakaramanos@gmail.com",
    celular: "+56 9 6228 XXXX",
    fecNacimiento: "1992-11-01",
    tipoSocio: 6
  };
  
  datosSocio!:SocioISinId;
  datosSocioISinId!:SocioISinId;
  datosSocioISinId2!:SocioISinId2;
  nuevoForm = new FormGroup({
    nombres: new FormControl(''),
    apePaterno: new FormControl(''),
    apeMaterno: new FormControl(''),
    correo: new FormControl(''),
    celular: new FormControl(''),
    fecNacimiento: new FormControl(''),
    tipoSocio: new FormControl(0),
    foto: new FormControl('')
  })

  

  ngOnInit(): void {
    let socioid = 1;
      let token = this.getToken();
    this.api.getSingleSocio(socioid).subscribe(data =>{
      this.datosSocio = data;
      console.log("this.datosSocio");
      console.log(this.datosSocio);
      //this.editarForm.setValue({
        this.nuevoForm.patchValue({
        'nombres': this.datosSocio.nombres,
        'apePaterno': this.datosSocio.apePaterno,
        'apeMaterno': this.datosSocio.apeMaterno,
        'correo': this.datosSocio.correo,
        'celular': this.datosSocio.celular,
        'fecNacimiento': this.datosSocio.fecNacimiento,
        'tipoSocio': this.datosSocio.tipoSocio,
        'foto': this.datosSocio.foto
      });
      console.log(this.nuevoForm.value);
    }) 
  }

  getToken(){
    return localStorage.getItem('token')
  }
  //se necesita el tokecn, ya que la API declara tanto el id del socio como el toque como REQUIRE

  postForm(){
  
    console.log("Llamada postSocio...");
    this.formx.nombres = this.nuevoForm.controls.nombres.value;
    this.formx.apePaterno = this.nuevoForm.controls.apePaterno.value;
    this.formx.apeMaterno = this.nuevoForm.controls.apeMaterno.value;
    this.formx.correo = this.nuevoForm.controls.correo.value;
    this.formx.celular = this.nuevoForm.controls.celular.value;
    this.formx.fecNacimiento = this.nuevoForm.controls.fecNacimiento.value;
    this.formx.tipoSocio = this.nuevoForm.controls.tipoSocio.value;
    this.api.postSocio(this.formx).subscribe( data =>{
      console.log('putSocio - data');
      console.log(data);
    })
  }

  salir(){
    this.router.navigate(['dashboard']);
  }

}
