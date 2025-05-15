import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';
import { EmployeesListComponent } from './Components/employee-list/employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeCreateComponent } from './Components/employee-create/employee-create.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    EmployeeFormComponent,
    EmployeesListComponent,
    EmployeeCreateComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class EmployeeModule { }
