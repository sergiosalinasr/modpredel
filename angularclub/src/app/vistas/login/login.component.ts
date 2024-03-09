import { Component } from '@angular/core';

import { FormGroup, FormControl, Validator, Validators} from '@angular/forms'
import { ApiService} from '../../servicios/api/api.service';
import { LoginI} from '../../modelos/login.interface';
import { ResponseI} from '../../modelos/response.interface'
import { environment } from '../../../environments/environment';


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
  
  loginForm = new FormGroup({
    usuario : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private router:Router) {}

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
    } else if (error.error && error.error.error_description) {
      this.errorMessage = error.error.error_description;
    } else {
      this.errorMessage = 'Ocurrió un error durante la autenticación.';
    }
  }

}
