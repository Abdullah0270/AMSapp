import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttendanceLogRequest, AttendanceLogResponse } from '../model/attendence-log';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceLogService {
  private baseUrl = 'http://localhost:5057/api/AttendanceLogs';

  constructor(private http: HttpClient) {}

  markAttendance(data: AttendanceLogRequest): Observable<AttendanceLogRequest[]> {
    return this.http.post<AttendanceLogResponse[]>(`${this.baseUrl}/clock`, data);
  }

  // getLogsByEmployee(globalId: string): Observable<AttendanceLogResponse[]> {
  //   return this.http.get<AttendanceLogResponse[]>(`${this.baseUrl}/employee/${globalId}`);
  // }

   getLogsByEmployeeId(employeeId: number): Observable<AttendanceLogResponse[]> {
    return this.http.get<AttendanceLogResponse[]>(`${this.baseUrl}/employee/${employeeId}`);
  }

  // Get logs by employee ID and date for Employee
  getLogsByEmployeeIdAndDate(employeeId: number, date: string): Observable<AttendanceLogResponse[]> {
    return this.http.get<AttendanceLogResponse[]>(`${this.baseUrl}/employee/${employeeId}/date/${date}`);
  }

  getAllLogs(): Observable<AttendanceLogResponse[]> {
    return this.http.get<AttendanceLogResponse[]>(this.baseUrl);
  }
  

  getLogsByDate(date: string): Observable<AttendanceLogResponse[]> {
    return this.http.get<AttendanceLogResponse[]>(`${this.baseUrl}/by-date/${date}`);
  }

  updateClockOut(payload: AttendanceLogRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/clock-out`, payload);
  }

  markAbsent(): Observable<any> {
    return this.http.post(`${this.baseUrl}/mark-absent`, {});
  }
}
