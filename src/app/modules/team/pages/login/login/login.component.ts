import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/usuarios']);
      },
      error: () => {
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }
}
