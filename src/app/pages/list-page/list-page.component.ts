import { Component } from '@angular/core';
import { LayoutComponent, ToolbarButton } from '../../layout/layout.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '../../common.module';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  shareReplay,
  switchMap,
} from 'rxjs';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../../services/todos.service';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AddTodoDialogComponent } from './components/add-todo-dialog/add-todo-dialog.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  standalone: true,
  imports: [
    LayoutComponent,
    TableModule,
    CommonModule,
    TodoItemComponent,
    ToastModule,
    AddTodoDialogComponent,
  ],
  providers: [MessageService],
})
export class ListPageComponent {
  protected toolbarButtons: ToolbarButton[] = [
    {
      style: 'p-button-outlined',
      icon: 'pi pi-plus',
      label: 'Add',
      action: () => {
        this.isAddDialogShown = true;
      },
    },
  ];

  protected todos$: Observable<Todo[]>;
  protected refresh$ = new BehaviorSubject(null);

  protected isAddDialogShown = false;

  constructor(
    private todosService: TodosService,
    private messageService: MessageService
  ) {
    this.todos$ = combineLatest([this.refresh$]).pipe(
      switchMap(() => todosService.getAll()),
      shareReplay()
    );
  }

  handleAddDialog(value: Todo | null) {
    if (value) {
      this.todosService.create(value).subscribe({
        next: () => this.refresh$.next(null),
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: `Unable to add todo "${value.title}"`,
            detail: error.message,
          });
        },
      });
    }
    this.isAddDialogShown = false;
  }

  todoStateChanged(todo: Todo, value: boolean) {
    this.todosService
      .updateById(todo.id, {
        state: value,
      })
      .subscribe({
        next: () => this.refresh$.next(null),
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: `Unable to update todo "${todo.title}"`,
            detail: error.message,
          });
          // Fix to restore previous checkbox value on error
          setTimeout(() => (todo.state = !value), 0);
        },
      });
  }
}
