// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[] | undefined;
    const userRole = this.authService.getUserRole();

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { sessionExpired: true } });
      return false;
    }

    if (expectedRoles && userRole && !expectedRoles.includes(userRole)) {
      this.router.navigate(['/usuarios/unauthorized']);
      return false;
    }

    return true;
  }
}
