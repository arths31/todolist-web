import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailComponent } from './todo-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDetailComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    component.todo = {
      id: '42',
      title: 'Test todo detail',
      state: false,
      description: 'yay',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title correcly', () => {
    expect(
      fixture.nativeElement.querySelector('.todo-title').innerText
    ).toEqual(component.todo.title);
  });

  it('should render description correcly', () => {
    expect(
      fixture.nativeElement.querySelector('.todo-description').innerText
    ).toEqual(component.todo.description);
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
