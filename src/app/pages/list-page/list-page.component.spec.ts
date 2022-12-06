import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageComponent } from './list-page.component';
import {
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { MockBackend } from '../../tools/mock-backend';
import { TodosService } from '../../services/todos.service';
import { take } from 'rxjs';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;
  let service: TodosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPageComponent, HttpClientModule],
      providers: [
        MockBackend,
        {
          provide: HttpClient,
          useFactory: (backend: HttpBackend) => new HttpClient(backend),
          deps: [MockBackend],
        },
      ],
    }).compileComponents();

    service = TestBed.inject(TodosService);
    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all mocked todos rendered', () => {
    const element: HTMLElement = fixture.nativeElement;

    service
      .getAll()
      .pipe(take(1))
      .subscribe((todos) =>
        expect(element.querySelectorAll('tr').length).toEqual(todos.length)
      );
  });
});
