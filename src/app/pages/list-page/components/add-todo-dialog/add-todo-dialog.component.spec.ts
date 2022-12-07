import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoDialogComponent } from './add-todo-dialog.component';
import { Todo } from '../../../../models/todo.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddTodoDialogComponent', () => {
  let component: AddTodoDialogComponent;
  let fixture: ComponentFixture<AddTodoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoDialogComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoDialogComponent);
    component = fixture.componentInstance;
    component.show = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build todo correctly', () => {
    const todo = <any>{
      title: 'Test',
      description: 'l33t',
    };
    const onSave = (value: Todo | null) => {
      expect(value).toEqual(todo);
    };
    component.close.subscribe((value) => onSave(value));
    component.todoToBeCreated = todo;
    fixture.nativeElement.querySelector('[name="save-button"]').click();
  });
});
