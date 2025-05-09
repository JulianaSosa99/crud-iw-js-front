import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/team/pages/login/login/login.component';
import { ObjetivoCreateComponent } from './modules/team/pages/objetivos/objetivo-create.component';

import { ObjetivoListComponent } from './modules/team/pages/objetivos/objetivo-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'usuarios', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/team/usuarios.module').then(m => m.UsuariosModule)
  },
 { path: 'objetivos', component: ObjetivoListComponent },
{ path: 'objetivos/crear', component: ObjetivoCreateComponent },
 { path: '**', redirectTo: 'login' }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

