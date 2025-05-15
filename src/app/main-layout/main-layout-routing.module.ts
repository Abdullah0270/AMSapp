import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { RoleGuard } from '../auth/admin.guard';
import { EmployeeGuard } from '../auth/employee-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },

  { 
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'employee',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
        loadChildren: () =>
          import('../employee/employee.module').then((m) => m.EmployeeModule),
      },
      {
        path: 'departments',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },

        loadChildren: () =>
          import('../departments/departments.module').then((m) => m.DepartmentsModule),
      },
      {
        path: 'shifts',
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] },
        loadChildren: () =>
          import('../shifts/shifts.module').then((m) => m.ShiftsModule),
      },
      {
        path: 'attendence-logs',
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'Employee'] },
        loadChildren: () =>
          import('../attendence-logs/attendence-logs.module').then((m) => m.AttendenceLogsModule),
      },
      {
        path: 'leave-requests',
        canActivate: [RoleGuard],
        data: { roles: ['Admin','Employee'] },
        loadChildren: () =>
          import('../leave-requests/leave-requests.module').then((m) => m.LeaveRequestsModule),
      },
      {
        path: '',
         redirectTo: 'attendence-logs/MarkAttndence',
         pathMatch: 'full'
       }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
