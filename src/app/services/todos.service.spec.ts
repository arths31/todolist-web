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

  it('should have two mocked todos', () => {
    service
      .getAll()
      .pipe(take(1))
      .subscribe((todos) => {
        expect(todos.length).toEqual(2);
      });
  });
});
