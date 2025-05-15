import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentRequest, DepartmentResponse } from '../../model/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css'],
})
export class DepartmentsListComponent implements OnInit {
  departments: DepartmentResponse[] = [];
  departmentForm!: FormGroup; 
  selectedDepartment: DepartmentResponse | null = null;

  constructor(
    private departmentService: DepartmentService,
    private fb: FormBuilder // Inject FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.initForm();
  }

  // Initialize form with validations
  initForm() {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  // Load departments from the API
  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  // Set form values for the department to be edited
  editDepartment(department: DepartmentResponse) {
    this.selectedDepartment = department;
    this.departmentForm.patchValue({
      name: department.name,
      description: department.description,
    });
  }

  // Handle form submission (Update department)
  onSubmit() {
    if (this.departmentForm.invalid) {
      return;
    }

    const formValue = this.departmentForm.value;

    const departmentRequest: DepartmentRequest = {
      ...formValue,
      globalId: this.selectedDepartment?.globalId, // Add the GlobalId for update
    };

    if (this.selectedDepartment) {
      // Call the update API
      this.departmentService.updateDepartment(departmentRequest).subscribe(
        (response) => {
          this.loadDepartments(); // Reload the departments after update
          this.selectedDepartment = null; // Reset selection
          this.departmentForm.reset(); // Reset the form
        },
        (error) => {
          console.error('Error updating department', error);
        }
      );
    }
  }

  // Delete a department
  deleteDepartment(globalId: string) {
    this.departmentService.deleteDepartment(globalId).subscribe(
      (response) => {
        this.loadDepartments(); // Reload the departments after delete
      },
      (error) => {
        console.error('Error deleting department', error);
      }
    );
  }
}
