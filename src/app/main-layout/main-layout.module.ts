import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { TopNavbarComponent } from './Components/top-navbar/top-navbar.component';
import { SharedModule } from '../shared/shared.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    MainLayoutComponent,
    TopNavbarComponent,

  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    
    SharedModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzMenuModule,
  ],
  exports:[
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzMenuModule,
  ]
})
export class MainLayoutModule { }
