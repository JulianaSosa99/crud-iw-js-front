import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    passwordHash: string;
    rol: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    private apiUrl = 'https://login-api-iw-js20250420140331-fzdeb6fchcb2hmfv.canadacentral-01.azurewebsites.net/api/usuario';

    constructor(private http: HttpClient, private authService: AuthService) { }

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl, { headers: this.getAuthHeaders() });
    }

    crearUsuario(usuario: Usuario): Observable<any> {
        return this.http.post(`${this.apiUrl}/registro`, usuario, { headers: this.getAuthHeaders() });
    }

    actualizarUsuario(id: number, usuario: Usuario): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, usuario, { headers: this.getAuthHeaders() });
    }

    eliminarUsuario(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
    }
}
