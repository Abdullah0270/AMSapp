import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsFormsComponent } from './components/departments-forms/departments-forms.component';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';

const routes: Routes = [
   
  { path: 'create', component:DepartmentsFormsComponent  },
  { path: 'list', component:DepartmentsListComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
