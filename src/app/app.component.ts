import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  get mostrarNavbar(): boolean {
    return this.router.url !== '/login';
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
