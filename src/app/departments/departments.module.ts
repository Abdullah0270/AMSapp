import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentsFormsComponent } from './components/departments-forms/departments-forms.component';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';



@NgModule({
  declarations: [
          DepartmentsFormsComponent,
          DepartmentsListComponent,
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DepartmentsModule { }
