import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/team/pages/login/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'usuarios', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/team/usuarios.module').then(m => m.UsuariosModule)
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

