// src/app/auth/employee.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // Adjust if path differs

@Injectable({
  providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole(); 
    if (role === 'Employee') {
      return true;
    }
    this.router.navigate(['/unauthorized']); // or redirect as needed
    return false;
  }
}
