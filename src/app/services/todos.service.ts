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
  constructor(protected http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`${API_URL}/todos`)
      .pipe(take(1), shareReplay());
  }
}
