import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShiftResponse } from '../model/shifts';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  private apiUrl = 'http://localhost:5057/api/shifts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ShiftResponse[]> {
    return this.http.get<ShiftResponse[]>(this.apiUrl);
  }

  create(shift: ShiftResponse): Observable<ShiftResponse> {
    return this.http.post<ShiftResponse>(this.apiUrl, shift);
  }

  update(globalId: string, shift: ShiftResponse): Observable<ShiftResponse> {
    return this.http.put<ShiftResponse>(`${this.apiUrl}/${globalId}`, shift);
  }

  delete(globalId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${globalId}`);
  }
}
