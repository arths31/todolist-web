import {
  HttpBackend,
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
    },
  };

  private todos: Todo[] = [
    {
      id: '0',
      title: 'Do the dishes',
      state: true,
    },
    {
      id: '1',
      title: 'Call Sogeti',
      state: false,
    },
  ];

  private getTodos(context: any, path: any, params: any): HttpResponse<Todo[]> {
    return new HttpResponse<Todo[]>({
      body: context.todos,
    });
  }

  override handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    let response: HttpResponse<any>;
    const regex = new RegExp(/http(s)?:\/\/[\w|:\d]*/);

    const url = new DefaultUrlSerializer().parse(req.url.replace(regex, ''));
    const params = url.queryParams;

    const method = req.method;
    const path = url.root.children[PRIMARY_OUTLET].segments.map((p) => p.path);

    const processingMethod: any = this.processingMethods[method]?.[path[0]];

    return of(
      !processingMethod
        ? new HttpResponse({
            status: 404,
            url: url.toString(),
            statusText: 'Not mocked',
          })
        : processingMethod(this, path, params)
    );
  }
}
