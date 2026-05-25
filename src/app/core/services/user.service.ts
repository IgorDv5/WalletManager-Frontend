import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../shared/models/users/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private baseURL = 'http://localhost:8080/users';

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`);
  }

  create(transaction: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}`, transaction);
  }

  update(transaction: User): Observable<User> {
    return this.http.put<User>(`${this.baseURL}/${transaction.id}`, transaction);
  }

  toggleSoftDelete(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseURL}/${id}/toggle`, {});
  }
}
