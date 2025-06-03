import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {}

  get mostrarNavbar(): boolean {
    return !this.router.url.startsWith('/login');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

 isAdmin(): boolean {
  return this.authService.getUserRole() === 'Admin';
}

isUsuario(): boolean {
  return this.authService.getUserRole() === 'Usuario';
}

}
