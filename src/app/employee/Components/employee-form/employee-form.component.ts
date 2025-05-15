import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../employee/Services/employee.service';
import { DepartmentService } from '../../../departments/services/department.service';
import { ShiftService } from '../../../shifts/services/shift.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee = {
    globalId: '',      // This should be set or selected somewhere
    shiftId: null,
    departmentId: null,
    role: ''
  };

  departments: any[] = [];
  shifts: any[] = [];
  unassignedEmployees: any[] = [];


  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private shiftService: ShiftService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadShifts();
    this.employeeService.getUnassignedEmployees().subscribe({
      next: (data) => {
        this.unassignedEmployees = data;
      },
      error: (err) => {
        alert('Failed to fetch unassigned employees.');
        console.error(err);
      }
    });
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

  assignRoleShiftDepartment(): void {
    if (!this.employee.globalId) {
      alert('Please enter or select a valid Employee ID.');
      return;
    }

    this.employeeService.assignShiftAndDepartment(this.employee).subscribe({
      next: () => alert('Assigned successfully!'),
      error: () => alert('Failed to assign.')
    });
  }

 
}
