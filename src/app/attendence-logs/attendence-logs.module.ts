import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendenceLogsRoutingModule } from './attendence-logs-routing.module';
import { AttndenceListComponent } from './components/attndence-list/attndence-list.component';
import { MarkAttendanceComponent } from './components/mark-attndence/mark-attndence.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule} from 'ng-zorro-antd/table';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';


@NgModule({
  declarations: [
    MarkAttendanceComponent,
    AttndenceListComponent
  ],
  imports: [
    CommonModule,
    AttendenceLogsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzAlertModule,
    NzSelectModule,
    NzButtonModule,
    NzFormModule,
    NzTableModule,
    NzPaginationModule
  ],
  exports:[
    NzAlertModule,
    NzSelectModule,
    NzButtonModule,
    NzFormModule,
    NzPaginationModule,
    ],
})
export class AttendenceLogsModule { }
