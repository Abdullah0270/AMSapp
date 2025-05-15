import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceLogService } from '../../services/attendence-log.service';
import { EmployeeService } from '../../../employee/Services/employee.service';
import { AuthService } from '../../../auth/services/auth.service';
import { EmployeeResponse } from 'src/app/employee/Model/employee';
import { AttendanceLogRequest } from '../../model/attendence-log';


@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attndence.component.html',
  styleUrls: ['./mark-attndence.component.css']
})
export class MarkAttendanceComponent implements OnInit {
  attendanceForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isAdmin = false;
  employees: EmployeeResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceLogService,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {
    this.attendanceForm = this.fb.group({
      employeeId: ''
    });
  }

  // ngOnInit(): void {
  //   const role = this.authService.getRole();
  //   const id = this.authService.getid();
  //   this.isAdmin = role === 'Admin';
  
  //   // Initialize form with conditional validation
  //   this.attendanceForm = this.fb.group({
  //     employeeId: [id || null, this.isAdmin ? Validators.required : []] // Only required if Admin
  //   });
  
  //   // Load employees if Admin
  //   if (this.isAdmin) {
  //     this.loadEmployees();
  //   } else if (id) {
  //     // Auto-fill for non-admin users
  //     this.attendanceForm.patchValue({ employeeId: id });
  //   }
  // }
  
  ngOnInit(): void {
    const role = this.authService.getRole();
    const id = this.authService.getid();
    this.isAdmin = role === 'Admin';
  
    // Only assign logged-in ID if not admin
    this.attendanceForm = this.fb.group({
      employeeId: [this.isAdmin ? null : id, Validators.required]
    });
  
    if (this.isAdmin) {
      this.loadEmployees();
    }
  }
  
  onEmployeeSelect(id: number): void {
    console.log('User selected employee ID:', id);
  }
  

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        console.log('show Employee ID:', this.employees); // Now inside next block
      },
      error: () => {
        this.errorMessage = 'Failed to load employees.';
      }
    });
  }
  

  // clockIn(): void {
  //   const employeeId = this.attendanceForm.get('employeeId')?.value;
  //   if (!employeeId) {
  //     this.errorMessage = 'Employee ID is required.';
  //     return;
  //   }

  //   const payload: AttendanceLogRequest = {
  //     employeeId,
  //     clockIn: new Date()
  //   };

  //   this.attendanceService.markAttendance(payload).subscribe({
  //     next: () => {
  //       this.successMessage = 'Clock-in successful.';
  //       this.errorMessage = '';

  //       // Add this method if missing

  //     },
  //     error: (err) => {
  //       this.errorMessage = `Clock-in error: ${err.message}`;
  //       this.successMessage = '';
  //     }
  //   });
  // }
  clockIn(): void {
    const employeeId = this.attendanceForm.get('employeeId')?.value;
    console.log('Selected Employee ID:', employeeId); // Debug the employee ID
    
  
    if (!employeeId) {
      this.errorMessage = 'Employee ID is required.';
      return;
    }
  
    const payload: AttendanceLogRequest = {
      employeeId,
      clockIn: new Date()
    };
  
    console.log('Payload:', payload); // Log the payload being sent
  
    this.attendanceService.markAttendance(payload).subscribe({
      next: () => {
        this.successMessage = 'Clock-in successful.';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = `Clock-in error: ${err.message}`;
        this.successMessage = '';
      }
    });
  }
  
  

  clockOut(): void {
    const employeeId = this.attendanceForm.get('employeeId')?.value;
    console.log('Selected Employee ID:', employeeId); // Debug the employee ID
    if (!employeeId) {
      this.errorMessage = 'Employee ID is required.';
      this.successMessage = '';
      return;
    }
  
    const payload: AttendanceLogRequest = {
      employeeId: employeeId,
      clockOut: new Date() // current timestamp
    };
  
    this.attendanceService.updateClockOut(payload).subscribe({
      next: () => {
        this.successMessage = 'Clock-out successful.';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err?.error || 'You must clock in first before clocking out.';
        this.successMessage = '';
      }
    });
  }
  
  
  

  markAbsent(): void {
    if (!this.isAdmin) {
      this.errorMessage = 'Only admin can mark absentees.';
      return;
    }

    this.attendanceService.markAbsent().subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Absent employees marked.';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = `Error marking absent: ${err.message}`;
        this.successMessage = '';
      }
    });
  }
}
