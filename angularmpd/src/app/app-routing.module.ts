import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './vistas/login/login.component';
import { MenuComponent} from './components/menu/menu.component'
import { MenulateralComponent } from './menulateral/menulateral.component';
import { authGuard } from './guards/auth.guard';
import { TablatduComponent } from './components/tablatdu/tablatdu.component';
import { TablacduComponent } from './components/tablacdu/tablacdu.component';
import { CdleyComponent } from './components/crudley/cdley/cdley.component';
import { CuleyComponent } from './components/crudley/culey/culey.component';
import { RddelitoComponent } from './components/cruddelito/rddelito/rddelito.component';
import { CudelitoComponent } from './components/cruddelito/cudelito/cudelito.component';
import { RdriesgoComponent } from './components/crudriesgo/rdriesgo/rdriesgo.component';
import { CuriesgoComponent } from './components/crudriesgo/curiesgo/curiesgo.component';


const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component:LoginComponent},
  { path: 'menu', component:MenuComponent, canActivate: [authGuard]},
  { path: 'menulateral', component: MenulateralComponent , canActivate: [authGuard], 
    children: [
      { path: 'tablatdu', component:TablatduComponent},
      { path: 'tablacdu', component:TablacduComponent},
      { path: 'cdley', component:CdleyComponent},
      { path: 'culey/:id', component:CuleyComponent},
      { path: 'rddelito', component:RddelitoComponent},
      { path: 'cudelito/:id', component:CudelitoComponent},
      { path: 'rdriesgo', component:RdriesgoComponent},
      { path: 'curiesgo/:id', component:CuriesgoComponent},
    ] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent, 
  TablatduComponent,
  TablacduComponent,
  CdleyComponent,
  CuleyComponent,
  RddelitoComponent,
  CudelitoComponent,
  RdriesgoComponent,
  CuriesgoComponent
]