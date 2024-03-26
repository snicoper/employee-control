import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResultItemFilter, ApiResultItemOrderBy } from '../core/features/api-result/_index';

/** Comprueba si es un ApiResult y deserializa filters. */
@Injectable()
export class ApiResultInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse && event.status === HttpStatusCode.Ok) {
          // Orders de ApiResult.
          if (Object.hasOwn(event.body, 'orders') && event.body.orders.length) {
            event.body.orders = JSON.parse(event.body.orders) as ApiResultItemOrderBy[];
          } else if (Object.hasOwn(event.body, 'orders')) {
            event.body.orders = [] as ApiResultItemOrderBy[];
          }

          // Filtros de ApiResult.
          if (Object.hasOwn(event.body, 'filters') && event.body.filters.length) {
            event.body.filters = JSON.parse(event.body.filters) as ApiResultItemFilter[];
          } else if (Object.hasOwn(event.body, 'filters')) {
            event.body.filters = [] as ApiResultItemFilter[];
          }
        }

        return event;
      })
    );
  }
}
