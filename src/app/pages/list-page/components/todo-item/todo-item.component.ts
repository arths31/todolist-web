import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Todo } from '../../../../models/todo.model';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '../../../../common.module';
import {RouterLink} from "@angular/router";

@Component({
  selector: '[app-todo-item]',
  templateUrl: './todo-item.component.html',
  standalone: true,
  imports: [CheckboxModule, CommonModule, RouterLink],
})
export class TodoItemComponent {
  @Input()
  todo!: Todo;

  @Output()
  stateChanged = new EventEmitter<any>
}
