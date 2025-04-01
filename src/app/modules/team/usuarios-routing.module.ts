import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { LoginComponent } from './pages/login/login/login.component';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'crear', component: FormComponent },
  { path: 'editar/:id', component: FormComponent },
  { path: 'login', component: LoginComponent }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
