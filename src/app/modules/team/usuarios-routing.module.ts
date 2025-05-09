import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { LoginComponent } from './pages/login/login/login.component';
import { AuthGuard } from '../../../app/guard/auth.guard'; // <- verifica que la ruta esté bien
import {ObjetivoListComponent} from '././pages/objetivos/objetivo-list.component'
import {ObjetivoCreateComponent} from '././pages/objetivos/objetivo-create.component'
import {TemaCreateComponent} from '././pages/temas/tema-create.component'

const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'crear', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'temas/crear', component: TemaCreateComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },

  { path: 'login', component: LoginComponent },
{ path: 'objetivos', component: ObjetivoListComponent },
{ path: 'objetivos/crear', component: ObjetivoCreateComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
