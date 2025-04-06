import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { LoginComponent } from './pages/login/login/login.component';
import { AuthGuard } from '../../../app/guard/auth.guard'; // <- verifica que la ruta esté bien

const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'crear', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
