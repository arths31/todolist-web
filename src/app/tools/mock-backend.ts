import {
  HttpBackend,
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DefaultUrlSerializer, PRIMARY_OUTLET } from '@angular/router';
import { Todo } from '../models/todo.model';

export class MockBackend extends HttpBackend {
  private processingMethods: {
    [method: string]: { [model: string]: Function };
  } = {
    GET: {
      todos: this.getTodos,
      todos_id: this.getTodoById,
    },
    PATCH: {
      todos_id: this.updateTodoById,
    },
    POST: {
      todos: this.createTodo,
    },
  };

  private todos: Todo[] = [
    {
      id: '3',
      title: 'Install Void Linux',
      state: false,
      description: '',
      createdOn: new Date(),
    },
    {
      id: '0',
      title: 'Do the dishes',
      state: true,
      description: 'There is a lot',
      createdOn: new Date(),
    },
    {
      id: '1',
      title: 'Call Sogeti',
      state: false,
      description: 'Maybe my todo list will get attention',
      createdOn: new Date(),
    },
  ];

  private updateTodoById(
    context: any,
    path: any,
    params: any,
    body: any
  ): HttpResponse<Todo> {
    const todo = context.todos.find((todo: Todo) => todo.id === path[1]);
    if (todo) {
      for (const [field, value] of Object.entries(body)) {
        todo[field] = value;
      }
      return new HttpResponse<Todo>({ body: todo });
    } else {
      throw new HttpErrorResponse({
        status: 404,
        statusText: 'Todo not found',
      });
    }
  }

  private createTodo(
    context: any,
    path: any,
    params: any,
    body: any
  ): HttpResponse<Todo> {
    if ('title' in body) {
      const todo: Todo = {
        ...body,
        id: String(Math.floor(Math.random() * (1000 - 3 + 1)) + 3),
        description: body.description || '',
        state: false,
        createdOn: new Date(),
      };
      context.todos = [todo, ...context.todos];
      return new HttpResponse<Todo>({ body: todo });
    } else {
      throw new HttpErrorResponse({
        status: 400,
        statusText: 'Title is required',
      });
    }
  }

  private getTodoById(context: any, path: any): HttpResponse<Todo> {
    const todo = context.todos.find((todo: Todo) => todo.id === path[1]);
    if (todo) {
      return new HttpResponse<Todo>({
        body: todo,
      });
    } else {
      throw new HttpErrorResponse({
        status: 404,
        statusText: 'Todo not found',
      });
    }
  }

  private getTodos(context: any): HttpResponse<Todo[]> {
    const sorted = [...context.todos].sort(
      (a: Todo, b: Todo) => +a.state - +b.state
    );
    return new HttpResponse<Todo[]>({
      body: sorted,
    });
  }

  override handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    let response: HttpResponse<any>;
    const regex = new RegExp(/http(s)?:\/\/[\w|:\d]*/);

    const url = new DefaultUrlSerializer().parse(req.url.replace(regex, ''));
    const params = url.queryParams;

    const method = req.method;
    const path = url.root.children[PRIMARY_OUTLET].segments.map((p) => p.path);

    const processingMethod: any =
      this.processingMethods[method]?.[
        `${path[0]}${path.length > 1 ? '_id' : ''}`
      ];

    if (!processingMethod) {
      throw new HttpErrorResponse({
        status: 404,
        url: url.toString(),
        statusText: 'Not mocked',
      });
    } else {
      return of(processingMethod(this, path, params, req.body));
    }
  }
}
