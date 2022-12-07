import {Component, EventEmitter, Input, Output} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {CommonModule} from "../../../../common.module";
import {InputTextModule} from "primeng/inputtext";
import {Todo} from "../../../../models/todo.model";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  standalone: true,
  imports: [DialogModule, CommonModule, InputTextModule, InputTextareaModule],
})
export class AddTodoDialogComponent {
  @Input()
  show: boolean = false;

  @Output()
  close = new EventEmitter<Todo | null>;

  todoToBeCreated: Todo = <any>{}


}
