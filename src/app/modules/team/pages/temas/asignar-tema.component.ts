import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignar-tema',
  templateUrl: './asignar-tema.component.html',
  styleUrls: ['./asignar-tema.component.css']
})
export class AsignarTemaComponent implements OnInit {
  usuarios: any[] = [];
  temas: any[] = [];
  usuarioSeleccionado: number | null = null;
  temaSeleccionado: number | null = null;
  apiBase = 'https://servicio-web-academico.onrender.com/api';

  constructor(private http: HttpClient, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarTemas();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data: any[]) => (this.usuarios = data),
      error: (err: any) => console.error('Error al cargar usuarios', err)
    });
  }

  cargarTemas(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    });
    this.http.get<any[]>(`${this.apiBase}/tema`, { headers }).subscribe({
      next: (data: any[]) => (this.temas = data),
      error: (err: any) => console.error('Error al cargar temas', err)
    });
  }

  asignarTemaAUsuario() {
    if (!this.usuarioSeleccionado || !this.temaSeleccionado) return;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      'Content-Type': 'application/json'
    });
    this.http.post(
      `${this.apiBase}/asignacion/${this.usuarioSeleccionado}`,
      [this.temaSeleccionado],
      { headers }
    ).subscribe({
      next: () => {
        alert('Tema asignado correctamente');
        // Redirige automáticamente a la pantalla de objetivos del usuario
        this.router.navigate(['/usuarios/mis-objetivos']);
      },
      error: (err) => {
        console.error('Error al asignar tema', err);
        alert('Error al asignar tema');
      }
    });
  }
}
