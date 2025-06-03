import { Component, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../../../../services/usuario.service';
import { TemaService } from '../../../../services/tema.service';
 
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  usuarios: Usuario[] = [];
  error = '';
  isLoading = true;
  reporte: any = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService,
    private temaService: TemaService // inyectar TemaService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/usuarios/login'], { queryParams: { sessionExpired: true } });
      return;
    }
  
    this.cargarUsuarios();
    this.obtenerReporte();
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
  
  esAdmin(): boolean {
    return this.authService.getUserRole() === 'Admin';
  }

  agregarTemaParaAdmin(nombre: string, descripcion: string = '') {
    if (!this.esAdmin()) {
      alert('Solo los administradores pueden agregar temas.');
      return;
    }
    this.temaService.insertarTema({ nombre, descripcion }).subscribe({
      next: () => {
        alert(`✅ Tema "${nombre}" creado correctamente`);
      },
      error: (err) => {
        if (err.status === 200 || err.status === 201) {
          alert(`✅ Tema "${nombre}" creado correctamente`);
        } else {
          alert('❌ Error al crear el tema');
        }
      }
    });
  }

  obtenerReporte(): void {
    this.temaService.obtenerReporteHitos().subscribe({
      next: (data) => {
        this.reporte = data;
        console.log('REPORTE:', data); // DEBUG: Verifica si llegan datos
      },
      error: (err) => console.error('Error al obtener reporte de hitos', err)
    });
  }
}
