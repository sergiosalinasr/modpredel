import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  env_empresa = environment.env_empresa;
  env_nombre_sistema = environment.env_nombre_sistema;
  version = environment.appVersion;
}
