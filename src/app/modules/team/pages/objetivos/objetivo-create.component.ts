import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService, Usuario } from '../../../../services/usuario.service';

@Component({
  selector: 'app-objetivo-create',
  templateUrl: './objetivo-create.component.html',
  styleUrls: ['./objetivo-create.component.css']
})
export class ObjetivoCreateComponent implements OnInit {
  objetivoForm!: FormGroup;
  temas: any[] = [];
  apiBase = 'https://servicio-web-academico.onrender.com/api';
  hitos: any[] = [];
  mostrarModalHito = false;
  objetivoId: number | null = null; // Guardar el id del objetivo creado
  usuarios: Usuario[] = [];
  usuarioSeleccionado: number | null = null;
  objetivos: any[] = [];
  objetivoSeleccionado: number | null = null; // temaId del objetivo seleccionado

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.objetivoForm = this.fb.group({
      nombreObjetivo: ['', Validators.required],
      descripcion: ['', Validators.required],
      temaId: ['', Validators.required]
    });
    this.cargarTemas();
    this.cargarUsuarios();
    this.cargarObjetivos();
  }

  cargarTemas(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    });
    this.http.get<any[]>(`${this.apiBase}/tema`, { headers }).subscribe({
      next: (data) => (this.temas = data),
      error: (err) => console.error('Error al cargar temas', err)
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data: Usuario[]) => (this.usuarios = data),
      error: (err: any) => console.error('Error al cargar usuarios', err)
    });
  }

  cargarObjetivos(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    });
    this.http.get<any[]>(`${this.apiBase}/Objetivo/por-usuario`, { headers }).subscribe({
      next: (data) => (this.objetivos = data),
      error: (err) => console.error('Error al cargar objetivos', err)
    });
  }

  abrirModalHito() {
    this.mostrarModalHito = true;
  }

  cerrarModalHito() {
    this.mostrarModalHito = false;
  }

  guardarObjetivo(): void {
    if (this.objetivoForm.invalid) return;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      'Content-Type': 'application/json'
    });
    const objetivo = {
      nombreObjetivo: this.objetivoForm.value.nombreObjetivo,
      temaId: Number(this.objetivoForm.value.temaId)
    };
    this.http.post<any>(`${this.apiBase}/Objetivo`, objetivo, { headers }).subscribe({
      next: (res) => {
        this.objetivoId = res.objetivoId || res.id; // según la respuesta del backend
        alert('Objetivo creado con éxito. Ahora puedes agregar hitos.');
      },
      error: (err) => {
        console.error('Error al guardar objetivo', err);
        alert('Error al guardar objetivo');
      }
    });
  }

  agregarHito(hito: any) {
    if (!this.objetivoId) return;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      'Content-Type': 'application/json'
    });
    hito.objetivoId = this.objetivoId;
    this.http.post(`${this.apiBase}/hito`, hito, { headers }).subscribe({
      next: () => {
        this.hitos.push(hito);
        this.mostrarModalHito = false;
        alert('Hito agregado con éxito');
      },
      error: (err) => {
        console.error('Error al agregar hito', err);
        alert('Error al agregar hito');
      }
    });
  }

  asignarObjetivoAUsuario() {
    if (!this.usuarioSeleccionado || !this.objetivoSeleccionado) return;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      'Content-Type': 'application/json'
    });
    this.http.post(
      `${this.apiBase}/asignacion/${this.usuarioSeleccionado}`,
      [this.objetivoSeleccionado],
      { headers }
    ).subscribe({
      next: () => {
        alert('Objetivo asignado correctamente');
        this.router.navigate(['/usuarios/mis-objetivos']); // Redirige para recargar
      },
      error: (err) => {
        console.error('Error al asignar objetivo', err);
        alert('Error al asignar objetivo');
      }
    });
  }
}
