import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../shared/models/auth/LoginRequest';
import { LoginResponse } from '../../shared/models/auth/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private baseURL = 'http://localhost:8080/auth';

  login(data: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`${this.baseURL}/login`,data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
