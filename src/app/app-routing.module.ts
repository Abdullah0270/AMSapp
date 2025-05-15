import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/Components/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  
  {
    path: 'main',
    loadChildren: () =>
      import('./main-layout/main-layout.module').then((m) => m.MainLayoutModule),
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
