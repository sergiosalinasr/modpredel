import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './vistas/login/login.component';
import { NuevoComponent} from './vistas/nuevo/nuevo.component';
import { EditarComponent} from './vistas/editar/editar.component';
import { DashboardComponent} from './vistas/dashboard/dashboard.component';
import { MenuComponent} from './components/menu/menu.component'
import { MenulateralComponent } from './menulateral/menulateral.component';
import { TduMaintenanceComponent} from './components/tdu/tdu.component';
import { EmployeeComponent} from './components/employee/employee.component';
import { authGuard } from './guards/auth.guard';
import { TablatduComponent } from './components/tablatdu/tablatdu.component';


const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component:LoginComponent},
  //{ path: 'dashboard', component:DashboardComponent},
  //{ path: 'nuevo', component:NuevoComponent},
  { path: 'editar/:id', component:EditarComponent},
  { path: 'menu', component:MenuComponent, canActivate: [authGuard]},
  { path: 'opcion1/subopcion1', component: DashboardComponent },
  { path: 'menulateral', component: MenulateralComponent , canActivate: [authGuard], 
    children: [
      { path: 'Tdu', component: TduMaintenanceComponent },
      { path: 'dashboard', component:DashboardComponent},
      { path: 'employee', component:EmployeeComponent},
      { path: 'tablatdu', component:TablatduComponent},
      { path: 'nuevo', component:NuevoComponent},
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
  DashboardComponent,
  EmployeeComponent,
  TablatduComponent,
  NuevoComponent,
  EditarComponent, 
  TduMaintenanceComponent
]