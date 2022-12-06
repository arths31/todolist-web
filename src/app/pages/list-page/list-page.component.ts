import { Component } from '@angular/core';
import { LayoutComponent, ToolbarButton } from '../../layout/layout.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '../../common.module';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../../services/todos.service';
import { CheckboxModule } from 'primeng/checkbox';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
  standalone: true,
  imports: [LayoutComponent, TableModule, CommonModule, TodoItemComponent],
})
export class ListPageComponent {
  protected toolbarButtons: ToolbarButton[] = [];
  protected todos$: Observable<Todo[]>;

  constructor(protected todosService: TodosService) {
    this.todos$ = todosService.getAll();
  }
}
