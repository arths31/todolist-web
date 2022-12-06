import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';
import {
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { MockBackend } from '../tools/mock-backend';
import { take } from 'rxjs';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        MockBackend,
        {
          provide: HttpClient,
          useFactory: (backend: HttpBackend) => new HttpClient(backend),
          deps: [MockBackend],
        },
      ],
    });
    service = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update todo correctly', () => {
    const data = {
      title: 'It works',
      state: true,
    };
    service.updateById('0', data).pipe(take(1)).subscribe();

    service.getById('0').subscribe((todo) => {
      expect(todo.title).toEqual(data.title);
      expect(todo.state).toEqual(data.state);
    });
  });

  it('done todos should be at end of list', () => {
    service.getAll().subscribe((todos) => {
      const waitingTodo = todos.find((todo) => !todo.state)!;
      const waitingTodoIndex = todos.indexOf(waitingTodo);

      service
        .updateById(waitingTodo.id, { state: true })
        .pipe(take(1))
        .subscribe();

      service.getAll().subscribe((updatedTodos) => {
        expect(
          updatedTodos.findIndex((todo) => todo.id === waitingTodo.id)
        ).not.toEqual(waitingTodoIndex);
      });
    });
  });

  it('should have three mocked todos', () => {
    service.getAll().subscribe((todos) => {
      expect(todos.length).toEqual(3);
    });
  });
});
