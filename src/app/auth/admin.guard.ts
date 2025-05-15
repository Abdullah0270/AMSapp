import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  // constructor(private authService: AuthService, private router: Router) {}

  // canActivate(): boolean {
  //   const role = this.authService.getRole();
  //   if (role === 'Admin') {
  //     return true;
  //   } else {
  //     this.router.navigate(['/unauthorized']);
  //     return false;
  //   }
  // }
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getRole();

    if (allowedRoles.includes(userRole)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
