import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
    mensajeExpiracion: string = '';


  constructor(private route: ActivatedRoute,private authService: AuthService, private router: Router) {}

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
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        if (params['sessionExpired']) {
          
          this.mensajeExpiracion = '⚠️ Tu sesión ha expirado. Por favor inicia sesión nuevamente.';
        }
      });
    }
  
  
   
}
