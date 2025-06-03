import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tema {
  temaID: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private apiUrl = 'https://servicio-web-academico.onrender.com/api/tema';

  constructor(private http: HttpClient) {}

  obtenerTemas(token: string): Observable<Tema[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Tema[]>(this.apiUrl, { headers });
  }

  insertarTema(dto: { nombre: string; descripcion: string }): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('jwtToken')}`
    );
    return this.http.post(this.apiUrl, dto, { headers });
  }

  obtenerReporteHitos() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('jwtToken')}`
    );
    return this.http.get('https://servicio-web-academico.onrender.com/api/Hito/reporte', { headers });
  }
}
