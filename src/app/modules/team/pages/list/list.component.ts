import { Component, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  usuarios: Usuario[] = [];
  error = '';
  isLoading = true;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los usuarios';
        this.isLoading = false;
      }
    });
  }
  
  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: (res) => {
          try {
            const parsed = typeof res === 'string' ? JSON.parse(res) : res;
            alert(parsed?.text || '🗑️ Usuario eliminado correctamente');
          } catch {
            alert('🗑️ Usuario eliminado correctamente');
          }
          this.cargarUsuarios();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          // Aquí verificamos si igual fue 200 pero con respuesta mal interpretada
          if (err.status === 200) {
            this.cargarUsuarios();
            alert('🗑️ Usuario eliminado correctamente (respuesta inesperada)');
          } else {
            alert('❌ Error al eliminar el usuario');
          }
        }
      });
    }
  }
  
  

  editar(id: number): void {
    this.router.navigate([`/usuarios/editar/${id}`]);
  }

  crear(): void {
    this.router.navigate([`/usuarios/crear`]);
  }
}
