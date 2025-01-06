import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './vistas/login/login.component';
//import { NuevoComponent} from './vistas/nuevo/nuevo.component';
//import { EditarComponent} from './vistas/editar/editar.component';
//import { DashboardComponent} from './vistas/dashboard/dashboard.component';
import { MenuComponent} from './components/menu/menu.component'
import { MenulateralComponent } from './menulateral/menulateral.component';
//import { TduMaintenanceComponent} from './components/tdu/tdu.component';
//import { EmployeeComponent} from './components/employee/employee.component';
import { authGuard } from './guards/auth.guard';
import { TablatduComponent } from './components/tablatdu/tablatdu.component';
import { TablacduComponent } from './components/tablacdu/tablacdu.component';
//import { LeyComponent } from './components/ley/ley.component';
import { CdleyComponent } from './components/crudley/cdley/cdley.component';
import { CuleyComponent } from './components/crudley/culey/culey.component';
import { RddelitoComponent } from './components/cruddelito/rddelito/rddelito.component';
import { CudelitoComponent } from './components/cruddelito/cudelito/cudelito.component';
import { RdriesgoComponent } from './components/crudriesgo/rdriesgo/rdriesgo.component';
import { CuriesgoComponent } from './components/crudriesgo/curiesgo/curiesgo.component';


const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component:LoginComponent},
  //{ path: 'dashboard', component:DashboardComponent},
  //{ path: 'nuevo', component:NuevoComponent},
  //{ path: 'editar/:id', component:EditarComponent},
  { path: 'menu', component:MenuComponent, canActivate: [authGuard]},
  //{ path: 'opcion1/subopcion1', component: DashboardComponent },
  { path: 'menulateral', component: MenulateralComponent , canActivate: [authGuard], 
    children: [
      //{ path: 'Tdu', component: TduMaintenanceComponent },
      //{ path: 'dashboard', component:DashboardComponent},
      //{ path: 'employee', component:EmployeeComponent},
      { path: 'tablatdu', component:TablatduComponent},
      { path: 'tablacdu', component:TablacduComponent},
      //{ path: 'ley', component:LeyComponent},
      { path: 'cdley', component:CdleyComponent},
      { path: 'culey/:id', component:CuleyComponent},
      { path: 'rddelito', component:RddelitoComponent},
      { path: 'cudelito/:id', component:CudelitoComponent},
      { path: 'rdriesgo', component:RdriesgoComponent},
      { path: 'curiesgo/:id', component:CuriesgoComponent},
      //{ path: 'nuevo', component:NuevoComponent},
      // Otras rutas hijas
    ] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//Esta constante se lleva a app.module.ts (ver lineas comentadas en app.module.ts)
export const routingComponents = [
  LoginComponent, 
  //DashboardComponent,
  //EmployeeComponent,
  TablatduComponent,
  TablacduComponent,
  //LeyComponent,
  CdleyComponent,
  CuleyComponent,
  RddelitoComponent,
  CudelitoComponent,
  RdriesgoComponent,
  CuriesgoComponent
  //NuevoComponent,
  //EditarComponent, 
  //TduMaintenanceComponent
]