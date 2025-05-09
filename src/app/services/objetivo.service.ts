import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface ObjetivoResponse {
  objetivoID: number;
  titulo: string;
  descripcion: string;
  temaID: number;
  nivelEvaluacion: number | null;
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
  private apiUrl = 'https://login-api-iw-js20250420140331-fzdeb6fchcb2hmfv.canadacentral-01.azurewebsites.net/api/objetivo';
  private hitoUrl = 'https://login-api-iw-js20250420140331-fzdeb6fchcb2hmfv.canadacentral-01.azurewebsites.net/api/hito';

  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    const token = localStorage.getItem('jwtToken') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /** Lista los objetivos del usuario autenticado */
  obtenerMisObjetivos(): Observable<ObjetivoResponse[]> {
    return this.http.get<ObjetivoResponse[]>(this.apiUrl, { headers: this.headers() });
  }

  /** Crea un objetivo y luego sus hitos */
  crearObjetivoConHitos(obj: ObjetivoCreate, hitos: string[]): Observable<void> {
    // 1) POST objetivo
    return this.http.post<{ mensaje: string }>(this.apiUrl, obj, { headers: this.headers() }).pipe(
      // 2) Obtener el nuevo ID. Como tu API no devuelve el ID, recargamos la lista y buscamos el último
      switchMap(() => this.obtenerMisObjetivos()),
      map(list => list[0].objetivoID), // asumimos que el nuevo objetivo queda al inicio
      switchMap(newId => {
        // 3) Crear cada hito en paralelo
        const calls = hitos.map(nombre =>
          this.http.post<{ mensaje: string }>(
            this.hitoUrl,
            { nombre, objetivoID: newId },
            { headers: this.headers() }
          )
        );
        return forkJoin(calls);
      }),
      // 4) Como no necesitamos el resultado, retornamos void
      map(() => void 0)
    );
  }

  /** Elimina un objetivo por su ID */
  eliminarObjetivo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers() });
  }
}
