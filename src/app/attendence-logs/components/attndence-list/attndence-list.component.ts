import { Component } from '@angular/core';
import { AttendanceLogResponse } from '../../model/attendence-log';
import { AttendanceLogService } from '../../services/attendence-log.service';
import { EmployeeService } from 'src/app/employee/Services/employee.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-attndence-list',
  templateUrl: './attndence-list.component.html',
  styleUrls: ['./attndence-list.component.css']
})
export class AttndenceListComponent {
  attendanceLogs: AttendanceLogResponse[] = [];
  employeeNames: { [id: number]: string } = {};
  errorMessage: string = '';
  searchDate: Date = new Date();
  userRole: string = '';
  employeeId: number | null = null;
  totalLogs = 0;        // Total number of logs (for pagination)
  currentPage = 1;      // Current page for pagination
  pageSize = 20;  

  constructor(
    private attendanceService: AttendanceLogService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadLogsBasedOnRole();
  }

  onPageIndexChange(page: number): void {
    this.currentPage = page; // Update the current page
    this.loadAllLogs(); // Fetch the logs for the new page
  }


  
  loadLogsBasedOnRole(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded: any = jwtDecode(token);
    this.userRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.employeeId = decoded.id;

    console.log('User Role:', this.userRole);  // Debugging the role
    console.log('Employee ID:', this.employeeId);  // Debugging the Employee ID

    if (this.userRole === 'Admin') {
      this.loadAllLogs();  // Admin can load all logs
    } else if (this.userRole === 'Employee' && this.employeeId) {
      this.loadEmployeeLogs(this.employeeId);  // Employee loads only their own logs
    }
  }

  loadAllLogs(): void {
    this.attendanceService.getAllLogs().subscribe({
      next: (data) => {
        this.attendanceLogs = data;
        this.loadEmployeeNames();  // Load employee names only for Admin
      },
      error: () => {
        this.errorMessage = 'Failed to load attendance logs';
      }
    });
  }

  loadEmployeeLogs(employeeId: number): void {
    this.attendanceService.getLogsByEmployeeId(employeeId).subscribe({
      next: (data) => {
        this.attendanceLogs = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load your attendance logs';
      }
    });
  }

  loadEmployeeNames(): void {
    // Load employee names only for Admin role
    if (this.userRole !== 'Admin') return;

    this.attendanceLogs.forEach(log => {
      if (!this.employeeNames[log.employeeId]) {
        this.employeeService.getEmployeeById(log.employeeId).subscribe({
          next: (emp) => this.employeeNames[log.employeeId] = emp.fullName,
          error: () => console.error('Failed to fetch employee name')
        });
      }
    });
  }

  searchLogsByDate(date: any): void {
    const dateObject = new Date(date);
    if (isNaN(dateObject.getTime())) return;  // Ensure valid date

    const formattedDate = dateObject.toISOString().split('T')[0];

    if (this.userRole === 'Admin') {
      // Admin can search logs by date
      this.attendanceService.getLogsByDate(formattedDate).subscribe({
        next: (logs) => {
          this.attendanceLogs = logs;
          this.loadEmployeeNames();  // Load employee names for Admin
        },
        error: () => {
          console.error('Failed to fetch logs by date');
        }
      });
    } else if (this.userRole === 'Employee' && this.employeeId) {
      // Employee can search their own logs by date
      this.attendanceService.getLogsByEmployeeIdAndDate(this.employeeId, formattedDate).subscribe({
        next: (logs) => {
          this.attendanceLogs = logs;
        },
        error: () => {
          console.error('Failed to fetch your logs by date');
        }
      });
    }
  }
}
