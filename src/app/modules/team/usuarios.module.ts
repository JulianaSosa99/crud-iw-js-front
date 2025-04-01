// src/app/modules/usuarios/usuarios.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { LoginComponent } from './pages/login/login/login.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    LoginComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule {}
