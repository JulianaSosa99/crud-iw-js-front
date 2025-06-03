import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/team/pages/login/login/login.component';
import { AdminDashboardComponent } from './modules/team/pages/admin/admin-dashboard/admin-dashboard.component';
import { UsuarioDashboardComponent } from './modules/team/pages/usuario/usuario-dashboard/usuario-dashboard.component';
import { UnauthorizedComponent } from './modules/team/pages/unauthorized/unauthorized.component';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'usuario',
    component: UsuarioDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Usuario'] }
  },
  { path: 'unauthorized', component: UnauthorizedComponent },

  {
    path: 'usuarios',
    loadChildren: () =>
      import('./modules/team/usuarios.module').then((m) => m.UsuariosModule)
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
