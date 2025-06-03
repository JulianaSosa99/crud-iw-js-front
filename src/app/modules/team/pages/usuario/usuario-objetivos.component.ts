import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-usuario-objetivos',
  templateUrl: './usuario-objetivos.component.html',
  styleUrls: ['./usuario-objetivos.component.css']
})
export class UsuarioObjetivosComponent implements OnInit {
  objetivos: any[] = [];
  progresos: any[] = [];
  recomendaciones: string[] = [];
  apiBase = 'https://servicio-web-academico.onrender.com/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarObjetivos();
    this.cargarRecomendaciones();
    this.cargarProgresos();
  }

  cargarObjetivos() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    });
    this.http.get<any[]>(`${this.apiBase}/usuario/objetivos`, { headers }).subscribe({
      next: (data) => (this.objetivos = data),
      error: (err) => console.error('Error al cargar objetivos', err)
    });
  }

  cargarProgresos() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    });
    this.http.get<any[]>(`${this.apiBase}/progreso`, { headers }).subscribe({
      next: (data) => (this.progresos = data),
      error: (err) => console.error('Error al cargar progresos', err)
    });
  }

  cargarRecomendaciones() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    });
    this.http.get<any>(`${this.apiBase}/recomendacion`, { headers }).subscribe({
      next: (data) => {
        if (data.sugerencias) {
          this.recomendaciones = data.sugerencias;
        } else if (data.mensaje) {
          this.recomendaciones = [data.mensaje];
        }
      },
      error: (err) => console.error('Error al cargar recomendaciones', err)
    });
  }

  getProgreso(hitoId: number): number | null {
    const progresosHito = this.progresos.filter(p => p.hitoId === hitoId);
    if (progresosHito.length === 0) return null;
    // Tomar el progreso con el id más alto (el más reciente)
    const ultimo = progresosHito.reduce((a, b) => (a.id > b.id ? a : b));
    return ultimo.valorObtenido;
  }

  calificarHito(objetivoId: number, hitoId: number, calificacion: number, escala: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      'Content-Type': 'application/json'
    });
    const body = {
      objetivoId,
      hitoId,
      escala,
      valorObtenido: calificacion
    };
    // Actualiza el progreso localmente para feedback inmediato
    const idx = this.progresos.findIndex(p => p.hitoId === hitoId);
    if (idx !== -1) {
      this.progresos[idx].valorObtenido = calificacion;
    } else {
      this.progresos.push({ objetivoId, hitoId, escala, valorObtenido: calificacion });
    }
    this.http.post(`${this.apiBase}/progreso`, body, { headers }).subscribe({
      next: () => {
        this.cargarProgresos();
        this.cargarRecomendaciones();
        this.cargarObjetivos(); // Recarga los objetivos después de calificar
      },
      error: (err) => {
        alert('Error al calificar hito');
        console.error('Error al calificar hito', err);
      }
    });
  }
}
