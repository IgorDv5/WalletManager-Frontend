import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../shared/models/transaction/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private http = inject(HttpClient);
  private baseURL = 'http://localhost:8080/transactions';

  findById(id:number): Observable<Transaction>{
    return this.http.get<Transaction>(`${this.baseURL}/${id}`);
  }

  findAll(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.baseURL}`);
  }

  create(transaction: Transaction): Observable<Transaction>{
    return this.http.post<Transaction>(`${this.baseURL}`,transaction);
  }

  update(transaction: Transaction): Observable<Transaction>{
    return this.http.put<Transaction>(`${this.baseURL}/${transaction.id}`, transaction);
  }

  toggleSoftDelete(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseURL}/${id}/toggle`, {});
  }

}
