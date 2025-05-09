import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'https://login-api-iw-js20250420140331-fzdeb6fchcb2hmfv.canadacentral-01.azurewebsites.net/api/Login';

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { email, password });
    }

    saveToken(token: string): void {
        localStorage.setItem('jwtToken', token);
    }

    getToken(): string | null {
        return localStorage.getItem('jwtToken');
    }

    logout(): void {
        localStorage.removeItem('jwtToken');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getUserRole(): string | null {
        const token = this.getToken();
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
    }

    getUserId(): number | null {
        const token = this.getToken();
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return parseInt(payload["id"]);
    }
    canActivate(): boolean {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          return true;
        } else {
          // Si no hay token, redirige a login con mensaje
          this.router.navigate(['/login'], { queryParams: { sessionExpired: true } });
          return false;
        }
      }
}