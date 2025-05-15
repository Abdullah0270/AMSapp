import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { LeaveApproveComponent } from './components/leave-approve/leave-approve.component';
import { LeaveStatusComponent } from './components/leave-status/leave-status.component';
import { RoleGuard } from '../auth/admin.guard';

const routes: Routes = [
  {path:'request',component:LeaveRequestComponent,canActivate: [RoleGuard], data: { roles: ['Admin','Employee'] },  },
  {path:'approve',component:LeaveApproveComponent,canActivate: [RoleGuard], data: { roles: ['Admin'] },},
  {path:'status',component:LeaveStatusComponent,canActivate: [RoleGuard], data: { roles: ['Admin','Employee'] },},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRequestsRoutingModule { }
