import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../shared/models/transaction/categories/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);
  private baseURL = 'http://localhost:8080/categories';


  findById(id:number): Observable<Category>{
    return this.http.get<Category>(`${this.baseURL}/${id}`);
  }

  findAll(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseURL}`);
  }

  create(category: Category) : Observable<Category>{
    return this.http.post<Category>(`${this.baseURL}`,category)
  }

  update(category: Category) : Observable<Category>{
    return this.http.put<Category>(`${this.baseURL}/${category.id}`,category);
  }

  delete(id: number) : Observable<void>{
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

}
