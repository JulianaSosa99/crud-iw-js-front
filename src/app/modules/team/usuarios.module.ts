import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { LoginComponent } from './pages/login/login/login.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { HitoFormModalComponent } from './../../components/hito-form-modal/hito-form-modal.component'; 
import { ObjetivoListComponent } from './pages/objetivos/objetivo-list.component';
import { ObjetivoCreateComponent } from './pages/objetivos/objetivo-create.component';
import { TemaCreateComponent } from './pages/temas/tema-create.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UsuarioDashboardComponent } from './pages/usuario/usuario-dashboard/usuario-dashboard.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AsignarTemaComponent } from './pages/temas/asignar-tema.component';
import { UsuarioObjetivosComponent } from './pages/usuario/usuario-objetivos.component';
@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    LoginComponent,
    ObjetivoListComponent,    
    ObjetivoCreateComponent,
    TemaCreateComponent,
    AdminDashboardComponent,
    UsuarioDashboardComponent,
    HitoFormModalComponent,
    UnauthorizedComponent,
    AsignarTemaComponent,
    UsuarioObjetivosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuariosRoutingModule,
      ReactiveFormsModule, 
  ]
})
export class UsuariosModule {}
