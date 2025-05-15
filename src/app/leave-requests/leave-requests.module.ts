import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRequestsRoutingModule } from './leave-requests-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { LeaveApproveComponent } from './components/leave-approve/leave-approve.component';
import { LeaveStatusComponent } from './components/leave-status/leave-status.component';


@NgModule({
  declarations: [
    LeaveRequestComponent,
    LeaveApproveComponent,
    LeaveStatusComponent,
  ],
  imports: [
    CommonModule,
    LeaveRequestsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LeaveRequestsModule { }
