import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface ObjetivoResponse {
  objetivoID: number;
  titulo: string;
  descripcion: string;
  temaID: number;
  nivelEvaluacion: number | null;
}

export interface ObjetivoAsignadoResponse {
  id: number;
  nombre: string;
  fechaAsignacion: string;
}

export interface ObjetivoCreate {
  titulo: string;
  descripcion: string;
  temaID: number;
}

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {
  private apiBase = 'https://servicio-web-academico.onrender.com/api';
  private objetivoUrl = `${this.apiBase}/Objetivo`;
  private hitoUrl = `${this.apiBase}/hito`;

  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    const token = localStorage.getItem('jwtToken') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /** ✅ Lógica correcta para distinguir rol */
  obtenerObjetivosPorRol(): Observable<(ObjetivoResponse | ObjetivoAsignadoResponse)[]> {
    const token = localStorage.getItem('jwtToken');
    if (!token) return of([]);

    const payload = JSON.parse(atob(token.split('.')[1]));
    const rol = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const url = rol === 'Admin'
      ? `${this.apiBase}/Objetivo/por-usuario`
      : `${this.apiBase}/usuario/objetivos`;

    return this.http.get<any[]>(url, { headers: this.headers() });
  }

  crearObjetivoConHitos(obj: ObjetivoCreate, hitos: string[]): Observable<void> {
    return this.http.post<{ mensaje: string }>(this.objetivoUrl, obj, { headers: this.headers() }).pipe(
      switchMap(() => this.obtenerObjetivosPorRol()),
      map(list => (list[0] as any).objetivoID || (list[0] as any).id),
      switchMap(newId => {
        const calls = hitos.map(nombre =>
          this.http.post<{ mensaje: string }>(
            this.hitoUrl,
            { nombre, objetivoID: newId },
            { headers: this.headers() }
          )
        );
        return forkJoin(calls);
      }),
      map(() => void 0)
    );
  }

  eliminarObjetivo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.objetivoUrl}/${id}`, { headers: this.headers() });
  }
}
