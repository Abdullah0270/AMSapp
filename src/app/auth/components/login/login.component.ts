import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  identifier = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  // login() {
  //   const request = { identifier: this.identifier, password: this.password };
  //   this.authService.login(request).subscribe({
  //     next: (res) => {
  //       localStorage.setItem('token', res.token);
  //       localStorage.setItem('globalId', res.globalId);
  //       localStorage.setItem('role', res.role);
  //       alert('Login Successful');
  //       this.router.navigate(['/main']);
  //     },
  //     error: (err) => {
  //       alert('Login Failed');
  //     }
  //   });
  // }
  login() {
    const request = { identifier: this.identifier, password: this.password };
    this.authService.login(request).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
  
        const decoded: any = jwtDecode(res.token);
        const globalId = decoded.id;
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const email = decoded.sub;
  
        localStorage.setItem('globalId', globalId);
        localStorage.setItem('role', role);
        localStorage.setItem('email', email);
  
        alert('Login Successful');
  
        // 👉 Navigate based on role
        if (role === 'Admin') {
          this.router.navigate(['/main/attendence-logs/MarkAttndence']);
        } else if (role === 'Employee') {
          this.router.navigate(['/main/attendence-logs/AttndenceList']);
        } else {
          alert('Unknown role');
        }
      },
      error: (err) => {
        alert('Login Failed');
      }
    });
  }
  
}
