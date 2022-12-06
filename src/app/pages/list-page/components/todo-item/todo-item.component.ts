import { Component, Input, Output } from '@angular/core';
import { Todo } from '../../../../models/todo.model';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '../../../../common.module';

@Component({
  selector: '[app-todo-item]',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  standalone: true,
  imports: [CheckboxModule, CommonModule],
})
export class TodoItemComponent {
  @Input()
  todo!: Todo;
}
