import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
//import { LoginComponent } from './vistas/login/login.component';
//import { DashboardComponent } from './vistas/dashboard/dashboard.component';
//import { NuevoComponent } from './vistas/nuevo/nuevo.component';
//import { EditarComponent } from './vistas/editar/editar.component';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//import { MenuComponent } from './components/menu/menu.component';
import { MenuhComponent } from './components/menuh/menuh.component';
import { MenulateralComponent } from './menulateral/menulateral.component';
import { TduMaintenanceComponent } from './components/tdu/tdu.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
//import { RdriesgoComponent } from './components/cruddelito/rdriesgo/rdriesgo.component';
//import { CuriesgoComponent } from './components/cruddelito/curiesgo/curiesgo.component';
//import { RddelitoComponent } from './components/cruddelito/rddelito/rddelito.component';
//import { CudelitoComponent } from './components/cruddelito/cudelito/cudelito.component';
//import { CuleyComponent } from './components/crudley/culey/culey.component';
//import { CdleyComponent } from './components/crudley/cdley/cdley.component';
//import { LeyComponent } from './components/ley/ley.component';
//import { TablacduComponent } from './components/tablacdu/tablacdu.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    //viene de app-routing.module.ts
    routingComponents,
    //MenuComponent,
    MenuhComponent,
    MenulateralComponent,
    TduMaintenanceComponent,
    //RdriesgoComponent,
    //CuriesgoComponent,
    //RddelitoComponent,
    //CudelitoComponent
    //CuleyComponent
    //CdleyComponent,
    //LeyComponent,
    //TablacduComponent
    //LoginComponent,
    //DashboardComponent,
    //NuevoComponent,
    //EditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
