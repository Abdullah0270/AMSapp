import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentRequest, DepartmentResponse } from '../../model/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departments-forms',
  templateUrl: './departments-forms.component.html',
  styleUrls: ['./departments-forms.component.css']
})
export class DepartmentsFormsComponent {
departmentRequest: DepartmentRequest = {};         

departmentForm!: FormGroup;   

constructor(
  private fb: FormBuilder,
  private departmentService: DepartmentService
) {}

ngOnInit() {
  this.departmentForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
}

onSubmit() {
  if (this.departmentForm.valid) {
    const departmentData: DepartmentRequest = this.departmentForm.value;
    console.log('Form Data:', departmentData);

    this.departmentService.createDepartment(departmentData).subscribe(
      (response) => {
        console.log('Department created successfully', response);

        this.departmentForm.reset();
      },
      (error) => {
        console.error('Error creating department', error);
      }
    );
  }
}



}
  