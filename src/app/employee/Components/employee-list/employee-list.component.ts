import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { EmployeeRequest, EmployeeResponse } from '../../Model/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: EmployeeResponse[] = [];
  employeeForm!: FormGroup;
  selectedEmployeeId: string | null = null;
  showUpdateForm: boolean = false;
  currentPage = 1;
  itemsPerPage = 5;


  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEmployees();
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      gender: [''],
      role: ['Employee'],
      departmentId: [null],
      shiftId: [null],
      fingerprintData: ['']
    });
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error('Failed to load employees', err)
    });
  }

  editEmployee(emp: EmployeeResponse): void {    
    this.selectedEmployeeId = emp.globalId;    
    this.employeeForm.patchValue(emp);
    this.showUpdateForm = true;
  }

  updateEmployee(): void {
    if (!this.selectedEmployeeId || !this.employeeForm.valid) return;
  
    const updatedData: EmployeeRequest = {
      ...this.employeeForm.value,
      globalId: this.selectedEmployeeId // required for update
    };
  
    this.employeeService.updateEmployee(this.selectedEmployeeId, updatedData).subscribe({
      next: () => {
        this.loadEmployees();
        this.resetForm();
      },
      error: (err) => console.error('Failed to update employee', err)
    });
  }
  

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: (err) => console.error('Failed to delete employee', err)
    });
  }

  resetForm(): void {
    this.employeeForm.reset();
    this.showUpdateForm = false;
    this.selectedEmployeeId = null;
  }
}
