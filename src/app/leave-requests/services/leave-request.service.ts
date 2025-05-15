import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveRequestDto } from '../model/leave-request';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeaveRequestService {
  private baseUrl = 'http://localhost:5057/api/LeaveRequests';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LeaveRequestDto[]> {
    return this.http.get<LeaveRequestDto[]>(this.baseUrl);
  }

  getMyRequests(employeeId: string): Observable<LeaveRequestDto[]> {
    return this.http.get<LeaveRequestDto[]>(`${this.baseUrl}/my/${employeeId}`);
  }

  getByGlobalId(globalId: string): Observable<LeaveRequestDto> {
    return this.http.get<LeaveRequestDto>(`${this.baseUrl}/${globalId}`);
  }

  submitRequest(data: LeaveRequestDto): Observable<LeaveRequestDto> {
    return this.http.post<LeaveRequestDto>(`${this.baseUrl}/submit`,data);
  }

  updateStatus(globalId: string, dto: { status: string }) {
    return this.http.put(`${this.baseUrl}/${globalId}`, dto);
  }

  delete(globalId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${globalId}`);
  }
}
