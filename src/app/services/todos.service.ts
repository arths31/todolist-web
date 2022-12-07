import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, take } from 'rxjs';
import { Todo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { MockBackend } from '../tools/mock-backend';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  getById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${API_URL}/todos/${id}`).pipe(take(1));
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${API_URL}/todos`).pipe(take(1));
  }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${API_URL}/todos`, todo).pipe(take(1));
  }

  updateById(id: string, data: any) {
    return this.http.patch<Todo>(`${API_URL}/todos/${id}`, data).pipe(take(1));
  }
}
