import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentRequest, DepartmentResponse } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService { private apiUrl = 'http://localhost:5057/api/departments'; // adjust API URL

  constructor(private http: HttpClient) {}

  createDepartment(department: DepartmentRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, department);
  }

  getAllDepartments(): Observable<DepartmentResponse[]> {
    return this.http.get<DepartmentResponse[]>(`${this.apiUrl}`);
  }

  // Update department
  updateDepartment(department: DepartmentRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${department.globalId}`, department);
  }

  // Delete a department
  deleteDepartment(globalId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${globalId}`);
  }
}
