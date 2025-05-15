// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeResponse,EmployeeRequest } from '../Model/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5057/api/employees';

  constructor(private http: HttpClient) {}
  
  createEmployee(employee: any) {
    return this.http.post(`${this.apiUrl}`, employee);
  }  

  // getAllEmployees(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/all`);
  // }
  getEmployeeById(employeeId: number): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.apiUrl}/${employeeId}`);
  }

  assignShiftAndDepartment(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/assignShiftDepartment`, data);
  }

  getUnassignedEmployees() {
    return this.http.get<any[]>(`${this.apiUrl}/unassigned`);
  }
  getAllEmployees(): Observable<EmployeeResponse[]> {
    return this.http.get<EmployeeResponse[]>(this.apiUrl);
  }

  updateEmployee(globalId: string, employee: EmployeeRequest) {
    if (!globalId) throw new Error("GlobalId is missing");
  
    return this.http.put(`${this.apiUrl}/${globalId}`, employee);
  }
  
  deleteEmployee(globalId: string) {
    if (!globalId) throw new Error("GlobalId is missing");
  
    return this.http.delete(`${this.apiUrl}/${globalId}`);
  }
  
}
