import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';
import { EmployeeCreateComponent } from './Components/employee-create/employee-create.component';
import { EmployeesListComponent } from './Components/employee-list/employee-list.component';
const routes: Routes = [
  { path: 'Assign', component: EmployeeFormComponent },
  {path:'create',component: EmployeeCreateComponent},
  {path:'list',component:EmployeesListComponent},
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
