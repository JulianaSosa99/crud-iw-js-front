import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service'
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
   
  }
)
export class AppComponent {
  constructor(private router: Router,private route: ActivatedRoute,private authService: AuthService) {}
  sessionExpired = false;

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
 
}
