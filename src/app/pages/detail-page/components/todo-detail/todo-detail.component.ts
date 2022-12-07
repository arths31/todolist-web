import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '../../../../common.module';
import {Todo} from "../../../../models/todo.model";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  imports: [CheckboxModule, PanelModule, CommonModule],
  standalone: true,
})
export class TodoDetailComponent {
  @Input()
  todo!: Todo;

  @Output()
  stateChanged = new EventEmitter<any>

}
