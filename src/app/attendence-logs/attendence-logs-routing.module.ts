import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttndenceListComponent } from './components/attndence-list/attndence-list.component';
import { MarkAttendanceComponent } from './components/mark-attndence/mark-attndence.component';
import { EmployeeGuard } from '../auth/employee-guard.guard';
import { RoleGuard } from '../auth/admin.guard';

const routes: Routes = [
  {path:'MarkAttndence',component:MarkAttendanceComponent,canActivate: [RoleGuard], data: { roles: ['Admin'] },},
  {path:'AttndenceList',component:AttndenceListComponent,canActivate: [RoleGuard], data: { roles: ['Admin','Employee'] },}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendenceLogsRoutingModule { }
