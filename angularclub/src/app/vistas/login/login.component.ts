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
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard'])
    }
  }


  // El usuario ingresa un par de credenciales...
  onLogin(form:any){
    
    // Validando usuario y clave...
    console.log("Validando usuario y clave...");
    if (!this.loginForm.valid) {
      console.log('El formulario no es válido');
      this.showMessage('Login no es satisfactorio', 'error');
      this.loginForm.markAllAsTouched(); // Hace que todos los controles se marquen como "touched" para mostrar errores
      
    } else {
      console.log('El formulario es válido:', this.loginForm.value);
      // Aquí manejarías la lógica de envío del formulario, como enviarlo a un servidor
      this.alertas.showSuccess('Intentando login...', 'Procesando');
      this.api.loginNode(form.usuario, form.password).subscribe({
        next: (data) => {
          //Las credenciales son válidas. Procesar la respuesta exitosa aquí (por ejemplo, redirigir al usuario o almacenar el token)
          
          localStorage.setItem("token",data.access_token);
          
          this.alertas.showSuccess('Login exitoso.', 'Hecho');
  
          this.router.navigate(['dashboard'])
  
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.alertas.showSuccess('Error de login...', 'En el servidor');
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

  nuevoUsuario(form:any){
    
    //Si uno de los datos de usuario/password no son válidos
      //mensaje de error Ususario/password
    //Si el usuario ya existe
      //Mensaje de error
    //Proceso para crear el nuevo usuario
      //Enviar usuario/password a node
        //Mensaje uduario creado exitosamente
      //Mensaje usuario no fue creado

    // Validando usuario y clave...
    console.log("Validando que Formato de usuario y Password sean válidos");
    if (!this.loginForm.valid) {
      console.log('ERROR: Formato inválido de usuario y/o Password');
      this.showMessage('Formato inválido de usuario y/o Password', 'error');
      this.loginForm.markAllAsTouched(); // Hace que todos los controles se marquen como "touched" para mostrar errores
      
    } else {
      console.log('El formulario es válido, por lo tanto validamos que el nuevo usuario no exista:', this.loginForm.value);
      // Aquí manejarías la lógica de envío del formulario, como enviarlo a un servidor
      this.alertas.showSuccess('Intentando login...', 'Procesando');
      this.api.loginNode(form.usuario, form.password).subscribe({
        next: (data) => {
          //Las credenciales son válidas. Procesar la respuesta exitosa aquí (por ejemplo, redirigir al usuario o almacenar el token)
          
          localStorage.setItem("token",data.access_token);
          
          this.alertas.showSuccess('Login exitoso.', 'Hecho');
  
          this.router.navigate(['dashboard'])
  
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.alertas.showSuccess('Error de login...', 'En el servidor');
          this.handleLoginError(error);
        }
      })
    }


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

  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = ''; // Limpiar mensaje después de 3 segundos
    }, 3000);
  }

}
