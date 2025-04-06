import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router,private route: ActivatedRoute,private authService: AuthService) {}
  sessionExpired = false;

  get mostrarNavbar(): boolean {
    return !this.router.url.startsWith('/login'); // 👈 esto reemplaza tu condición anterior
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
 
}
