import { EmployeeModule } from './employee/employee.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentsModule } from './departments/departments.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AttendenceLogsModule } from './attendence-logs/attendence-logs.module';
import { LeaveRequestsModule } from './leave-requests/leave-requests.module';
import { SharedModule } from './shared/shared.module';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgxPaginationModule } from 'ngx-pagination';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    DepartmentsModule,
    ShiftsModule,
    AttendenceLogsModule,
    LeaveRequestsModule,
    SharedModule,
    MainLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzMenuModule,
    NgxPaginationModule

    
  ],
  providers: [
    {
    // { provide: NZ_I18N, useValue: en_US ,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
