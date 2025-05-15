import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftsRoutingModule } from './shifts-routing.module';
import { ShiftsComponent } from './components/shifts/shifts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShiftsComponent
  ],
  imports: [
    CommonModule,
    ShiftsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ShiftsModule { }
