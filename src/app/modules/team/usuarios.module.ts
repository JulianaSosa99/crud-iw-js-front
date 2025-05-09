import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { LoginComponent } from './pages/login/login/login.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';

import { ObjetivoListComponent } from './pages/objetivos/objetivo-list.component';
import { ObjetivoCreateComponent } from './pages/objetivos/objetivo-create.component';
import { TemaCreateComponent } from './pages/temas/tema-create.component';
@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    LoginComponent,
    ObjetivoListComponent,    
    ObjetivoCreateComponent,
    TemaCreateComponent   
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule {}
