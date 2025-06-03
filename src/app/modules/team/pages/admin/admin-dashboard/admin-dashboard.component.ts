import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  irAUsuarios(): void {
    this.router.navigate(['/usuarios']);
  }

  irACrearTema(): void {
    this.router.navigate(['/usuarios/temas/crear']);
  }

  irAObjetivos(): void {
    this.router.navigate(['/usuarios/objetivos']);
  }

  irACrearObjetivo(): void {
    this.router.navigate(['/usuarios/objetivos/crear']);
  }

  logout(): void {
    this.authService.logout();
  }
}
