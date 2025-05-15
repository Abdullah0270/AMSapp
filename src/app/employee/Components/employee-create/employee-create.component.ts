import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../employee/Services/employee.service';
import { DepartmentService } from '../../../departments/services/department.service';
import { ShiftService } from '../../../shifts/services/shift.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employee = {
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender: '',
    role: 'Employee',
    departmentId: null,
    shiftId: null,
    faceData: null,
    fingerprintData: null
  };

  departments: any[] = [];
  shifts: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private shiftService: ShiftService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadShifts();
  }

  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (res) => this.departments = res,
      error: () => alert('Failed to load departments')
    });
  }

  loadShifts(): void {
    this.shiftService.getAll().subscribe({
      next: (res) => this.shifts = res,
      error: () => alert('Failed to load shifts')
    });
  }

  createEmployee(): void {
    this.employee.faceData = null;
    this.employee.fingerprintData = null;

    this.employeeService.createEmployee(this.employee).subscribe({
      next: () => alert('Employee created successfully!'),
      error: () => alert('Failed to create employee.')
    });
  }
}
