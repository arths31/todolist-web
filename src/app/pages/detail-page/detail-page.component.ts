import { Component } from '@angular/core';
import { LayoutComponent } from '../../layout/layout.component';
import { CommonModule } from '../../common.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../../services/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  standalone: true,
  imports: [
    CheckboxModule,
    LayoutComponent,
    CommonModule,
    ToastModule,
    PanelModule,
    TodoDetailComponent,
  ],
  providers: [MessageService],
})
export class DetailPageComponent {
  protected todo$: Observable<Todo | null>;

  constructor(
    private todosService: TodosService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.todo$ = route.params.pipe(
      switchMap((params) => {
        return this.todosService.getById(params['id']);
      }),
      catchError(() => {
        router.navigate(['']);
        return of(null);
      })
    );
  }

  todoStateChanged(todo: Todo, value: boolean) {
    this.todosService
      .updateById(todo.id, {
        state: value,
      })
      .subscribe({
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
