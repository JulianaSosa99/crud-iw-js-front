import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  mensajeExpiracion: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['sessionExpired']) {
        this.mensajeExpiracion = '⚠️ Tu sesión ha expirado. Por favor inicia sesión nuevamente.';
      }
    });
  }
  login(): void {
  this.authService.login(this.email, this.password).subscribe({
    next: (res) => {
      this.authService.saveToken(res.token);

      const rol = this.authService.getUserRole();

      if (rol === 'Admin') {
        this.router.navigate(['/usuarios']); // o el dashboard del admin
      } else if (rol === 'Usuario') {
        this.router.navigate(['/usuarios/objetivos']); // 👈 esta es la ruta del usuario
      } else {
        this.errorMessage = 'Rol desconocido';
      }
    },
    error: () => {
      this.errorMessage = 'Credenciales inválidas';
    }
  });
}


}
