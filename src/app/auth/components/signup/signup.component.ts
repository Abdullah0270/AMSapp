import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  employee = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword:'',
    phoneNumber: '',
    gender: ''
  };

  constructor(private authService: AuthService,private router: Router ) {}

  signup() {
    if (this.employee.password !== this.employee.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  
    const employeeData = {
      fullName: this.employee.fullName,
      email: this.employee.email,
      password: this.employee.password,
      phoneNumber: this.employee.phoneNumber,
      gender: this.employee.gender
    };
  
    this.authService.signup(employeeData).subscribe({
      next: (res) => {
        alert('Employee created successfully.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Signup failed.');
      }
    });
  }
  
}
