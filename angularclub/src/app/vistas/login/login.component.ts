import { Component } from '@angular/core';

import { FormGroup, FormControl, Validator, Validators} from '@angular/forms'
import { ApiService} from '../../servicios/api/api.service';
import { LoginI} from '../../modelos/login.interface';
import { ResponseI} from '../../modelos/response.interface'
import { environment } from '../../../environments/environment';
import { AlertasService } from '../../servicios/alertas/alertas.service';


import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  version = environment.appVersion;
  errorMessage: string = '';
  v_token: string = '';
  
  loginForm = new FormGroup({
    usuario : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private router:Router, private alertas:AlertasService) {}

  errorStatus:boolean = false;
  errorMsj:any = "";

  ngOnInit(): void{
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard'])
    }
  }


  onLogin(form:any){
    
    /*
    this.api.loginByEmail(form).subscribe(data =>{
      let dataResponse:ResponseI =data;
      if (dataResponse.status == "ok"){
        localStorage.setItem("token",dataResponse.result.token);
        this.router.navigate(['dashboard'])
      }else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.result.error_msg;
      }
    })
    */
    
    
    this.api.login(form.usuario, form.password).subscribe({
      //data =>{
      next: (data) => {
        console.log('Login exitoso. data.access_token:', data.access_token);
        localStorage.setItem("token",data.access_token);
        
        this.alertas.showSuccess('Login exitoso.', 'Hecho');

        this.router.navigate(['dashboard'])
        // Procesar la respuesta exitosa aquí (por ejemplo, redirigir al usuario o almacenar el token)
      },
      error: (error) => {
        console.error('Error de login:', error);
        
        this.handleLoginError(error);
      }
    })
    
  }

  // Método para manejar errores de login
  handleLoginError(error: any) {
    // Aquí puedes personalizar el manejo de errores basado en el error recibido
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

  nuevoUsuario(form:any){
    
    this.api.login("admin", "admin").subscribe({
      //data =>{
      next: (data) => {
        console.log('Login exitoso. data.access_token:', data.access_token);
        this.v_token = data.access_token;
        //this.api.createUser(this.v_token, form.usuario, form.password)
        this.addUser(this.v_token, form.usuario, form.password);
      },
      error: (error) => {
        console.error('Error de login:', error);
        this.handleLoginError(error);
      }
    });
    console.log('Login exitoso. data.access_token:', this.v_token);
  }

  addUser(vp_token: string, vp_usuario: string, vp_password: string) {
    const adminToken = vp_token; // Obtén este valor de forma segura
    const userData = {
      username: vp_usuario,
      enabled: true,
      emailVerified: true,
      firstName: "Nombre",
      lastName: "Apellido",
      email: vp_usuario + "@ejemplo.com",
      credentials: [{
        type: "password",
        value: vp_password,
        temporary: false
      }]
    };

    this.api.createUser2(adminToken, userData).subscribe({
      next: (response) => this.alertas.showSuccess('Usuario creado exitosamente', 'Do it'),
      error: (error) => {
        this.alertas.showSuccess('Error al crear usuario', 'Try');
        console.error('Error al crear usuario', error)
      }
    });
  }

}
