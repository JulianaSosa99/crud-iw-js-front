import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService, Usuario } from '../../../../services/usuario.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    email: '',
    passwordHash: '',
    rol: 'Usuario'
  };

  isEditMode = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.usuarioService.getUsuarios().subscribe(data => {
        const usuarioExistente = data.find(u => u.id === +id);
        if (usuarioExistente) {
          this.usuario = { ...usuarioExistente, passwordHash: '' };
        }
      });
    }
  }

  onSubmit(): void {
    this.error = '';

    if (this.isEditMode) {
      this.usuarioService.actualizarUsuario(this.usuario.id, this.usuario).subscribe({
        next: (res) => {
          // Si el backend responde con texto plano, tratamos de mostrarlo bien
          const mensaje = typeof res === 'string' ? res : res?.message || '✅ Usuario actualizado correctamente';
          alert(mensaje);
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);

          // Si el error es falso pero el status es 200, lo tratamos como éxito
          if (err.status === 200) {
            alert('✅ Usuario actualizado correctamente');
            this.router.navigate(['/usuarios']);
          } else {
            this.error = '❌ Error al actualizar el usuario.';
          }
        }
      });
    } else {
      this.usuarioService.crearUsuario(this.usuario).subscribe({
        next: (res) => {
          const mensaje = res?.text || '✅ Usuario registrado exitosamente';
          alert(mensaje);
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('Error al crear usuario:', err);
          this.error = typeof err.error === 'string' ? err.error : JSON.stringify(err.error);
        }
      });
    }
  }
}
