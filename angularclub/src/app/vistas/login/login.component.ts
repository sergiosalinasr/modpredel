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

  // Estado del mensaje
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  
  loginForm = new FormGroup({
    usuario : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private router:Router, private alertas:AlertasService) {}

  errorStatus:boolean = false;
  errorMsj:any = "";

  ngOnInit(): void{
    this.checkLocalStorage();
    this.alertas.currentMessage.subscribe(msg => this.message = msg);
    this.alertas.currentMessageType.subscribe(type => this.messageType = type);

  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      //this.router.navigate(['dashboard'])
      this.router.navigate(['menu'])
    }
  }


  // El usuario ingresa un par de credenciales...
  onLogin(form:any){
    
    // Validando usuario y clave...
    if (!this.loginForm.valid) {
      this.alertas.showMessage('Error: Ingrese usuario y password', 'error');
      this.loginForm.markAllAsTouched(); // Hace que todos los controles se marquen como "touched" para mostrar errores
      
    } else {
      // Aquí manejarías la lógica de envío del formulario, como enviarlo a un servidor
      this.alertas.showMessage('Intentando login...', 'success');
      this.api.loginNode(form.usuario, form.password).subscribe({
        next: (data) => {
          //Las credenciales son válidas. Procesar la respuesta exitosa aquí (por ejemplo, redirigir al usuario o almacenar el token)
          
          localStorage.setItem("token",data.access_token);
          
          this.alertas.showMessage('Login exitoso.', 'success');
  
          //this.router.navigate(['dashboard'])
          this.router.navigate(['menu'])
  
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.alertas.showMessage('Error de login en el servidor...', 'error');
          this.handleLoginError(error);
        }
      })
    }
    
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

  // El usuario ingresa un par de credenciales...
  nuevoUsuario(form:any){
    
    // Validando usuario y clave...
    console.log("Validando usuario y clave...");
    if (!this.loginForm.valid) {
      console.log('Error: ingrese un formato de usuario y Password válidos');
      this.alertas.showMessage('Nuevo usuario no es satisfactorio', 'error');
      this.loginForm.markAllAsTouched(); // Hace que todos los controles se marquen como "touched" para mostrar errores
      
    } else {
      console.log('El formato de usuario y Password válidos', this.loginForm.value);
      // Aquí manejarías la lógica de envío del formulario, como enviarlo a un servidor
      this.alertas.showSuccess('Intentando SignUp...', 'Procesando');
      this.api.signUpNode(form.usuario, form.password).subscribe({
        next: (data) => {
          //Las credenciales son válidas. Procesar la respuesta exitosa aquí (por ejemplo, redirigir al usuario o almacenar el token)
          
          localStorage.setItem("token",data.access_token);
          
          this.alertas.showSuccess('SignUp exitoso.', 'Hecho');
  
          this.router.navigate(['dashboard'])
  
        },
        error: (error) => {
          console.error('Error de SignUp:', error);
          this.alertas.showSuccess('Error de SignUp...', 'En el servidor');
          this.handleLoginError(error);
        }
      })
    }
    
  }

  /*
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
  */
  

}
