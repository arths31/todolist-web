import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = {
      id: '1337',
      title: 'Test todo',
      state: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title correcly', () => {
    expect(fixture.nativeElement.querySelectorAll('td')[1].innerText).toEqual(
      component.todo.title
    );
  });

  it('should strike text when state is marked as done', () => {
    expect(fixture.nativeElement.querySelector('line-through')).toBeNull();
    component.todo.state = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('line-through')).toBeDefined();
  });

  it('should render state correcly', () => {
    const element: HTMLElement =
      fixture.nativeElement.querySelector('p-checkbox');
    expect(element.attributes.getNamedItem('ng-reflect-model')!.value).toEqual(
      String(component.todo.state)
    );
  });
});
