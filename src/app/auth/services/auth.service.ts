import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5057/api/auth';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }

  getid(): string | null {
    const decoded = this.getDecodedToken();
    return decoded?.id || null;
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-user-info`);
  }
  
  getfullname(): string | null {
    const decoded = this.getDecodedToken();
    return decoded?.FullName || null;
  }
  
  
  getRole(): string  {
    const decoded = this.getDecodedToken();
    return decoded?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
