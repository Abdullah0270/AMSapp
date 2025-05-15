// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../../auth/services/auth.service'; // Assuming you have an auth service

// @Component({
//   selector: 'app-top-navbar',
//   templateUrl: './top-navbar.component.html',
//   styleUrls: ['./top-navbar.component.css']
// })
// export class TopNavbarComponent implements OnInit {
//   isLoggedIn: boolean = false;
//   fullName: string = '';  // Full name of the logged-in user
//   role: string = '';      // Role of the logged-in user

//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     // Fetch user data if logged in
//     this.checkLoginStatus();
//   }

//   checkLoginStatus(): void {
//     this.isLoggedIn = this.authService.isLoggedIn();  // Assume method in AuthService
//     if (this.isLoggedIn) {
//       this.authService.getUserInfo().subscribe(userInfo => {
//         this.fullName = userInfo.fullName;  // Assign full name from user data
//         this.role = userInfo.role;          // Assign role from user data
//       });
//     }
//   }

//   logout(): void {
//     this.authService.logout();
//     // Handle logout logic (clear session, redirect, etc.)
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html'
})
export class TopNavbarComponent implements OnInit {
  fullName: string = '';
  role: string = '';
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.authService.getUserInfo().subscribe({
        next: (res) => {
          this.fullName = res.fullName;
          this.role = res.role;
        },
        error: (err) => {
          console.error('Failed to get user info', err);
        }
      });
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '/auth/login';
  }
}
