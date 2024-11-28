import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocioISinId, SocioI } from '../../modelos/socio.interface';
import { ApiService } from '../../servicios/api/api.service';
import { ResponseI} from '../../modelos/response.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {

  respuesta: ResponseI;

  constructor( private activerouter:ActivatedRoute, private router:Router, private api:ApiService, private alertas:AlertasService){ 
    this.respuesta = {
      status: 'initial', // Un valor inicial adecuado
      result: 'nok' // Asume un valor inicial, ajusta según sea necesario
    };
  }

  //OJO: aquí puse el signo ! que no está en el video 10 (min 12:30)
  datosSocio!:SocioI;
  
  editarForm = new FormGroup({
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
      let socioid = this.activerouter.snapshot.paramMap.get('id');
      let token = this.getToken();
      this.api.getSingleSocio(socioid).subscribe(data =>{
        this.datosSocio = data;
        console.log("this.datosSocio");
        console.log(this.datosSocio);
        //this.editarForm.setValue({
          this.editarForm.patchValue({
          'nombres': this.datosSocio.nombres,
          'apePaterno': this.datosSocio.apePaterno,
          'apeMaterno': this.datosSocio.apeMaterno,
          'correo': this.datosSocio.correo,
          'celular': this.datosSocio.celular,
          'fecNacimiento': this.datosSocio.fecNacimiento,
          'tipoSocio': this.datosSocio.tipoSocio,
          'foto': this.datosSocio.foto
        });
        console.log(this.editarForm.value);
      })
  }

  //se necesita el tokecn, ya que la API declara tanto el id del socio como el toque como REQUIRED
  getToken(){
    return localStorage.getItem('token')
  }

  postForm(){
    
    console.log("lo que tiene: this.editarForm.controls.nombres.value");
    console.log(this.editarForm.value);
    this.datosSocio.nombres = this.editarForm.controls.nombres.value || '';
    this.datosSocio.apePaterno = this.editarForm.controls.apePaterno.value!;
    this.datosSocio.apeMaterno = this.editarForm.controls.apeMaterno.value!;
    this.datosSocio.correo = this.editarForm.controls.correo.value!;
    this.datosSocio.celular = this.editarForm.controls.celular.value!;
    this.datosSocio.fecNacimiento = this.editarForm.controls.fecNacimiento.value!;
    this.datosSocio.tipoSocio = this.editarForm.controls.tipoSocio.value!;
    this.datosSocio.foto = this.editarForm.controls.foto.value!;
    console.log("this.datosSocio - BOTON Guardar");
    console.log(this.datosSocio);
    this.api.putSocio(this.datosSocio).subscribe( data =>{
      let dataResponse:any=data;
      console.log("CONTENIDO de: data.result");
      console.log(dataResponse);
      console.log("CONTENIDO de: respuesta");
      if (dataResponse.id == this.datosSocio.id){
        this.alertas.showSuccess('Datos modificados', 'Hecho');
      }else{
        this.alertas.showError('Datos NO modificados','Error')
      }
    })
    
    /*console.log(this.editarForm.controls.nombres.value);
    console.log(this.editarForm.controls.apePaterno.value);
    console.log(this.editarForm.controls.apeMaterno.value);
    console.log(this.editarForm.controls.correo.value);
    console.log(this.editarForm.controls.celular.value);
    console.log(this.editarForm.controls.fecNacimiento.value);
    console.log(this.editarForm.controls.tipoSocio.value);
    console.log(this.editarForm.controls.foto.value);
    */
  }

  eliminar(){
    this.api.deleteSocio(this.datosSocio).subscribe(data=>{
      let dataResponse:any=data;
      console.log("ELIMINAR de: data.result");
      console.log(dataResponse);
      console.log("CONTENIDO de: respuesta");
      if (dataResponse == null){
        this.alertas.showSuccess('Datos eliminados', 'Hecho');
      }else{
        this.alertas.showError('Datos NO eliminados','Error')
      }
    })
  }

  salir(){
    this.router.navigate(['dashboard']);
  }

  consolelog(msg:string){
    console.log('submitting')
  }
}
