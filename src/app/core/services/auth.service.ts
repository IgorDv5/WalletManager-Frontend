import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../shared/models/auth/LoginRequest';
import { LoginResponse } from '../../shared/models/auth/LoginResponse';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../../shared/models/auth/TokenPayload';
import { User } from '../../shared/models/users/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private baseURL = 'http://localhost:8080/auth';

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseURL}/login`, data);
  }

  register(data: User): Observable<User>{
    return this.http.post<User>(`${this.baseURL}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): TokenPayload | null {

    const token = this.getToken();

    if (!token) return null;

    return jwtDecode<TokenPayload>(token);
  }

  getRole(): string | null {
    return this.getDecodedToken()?.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
