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
import { ApiResultItemFilter } from '../core/features/api-result/api-result-item-filter';
import { ApiResultItemOrderBy } from '../core/features/api-result/api-result-item-order-by';

/** Comprueba si es un ApiResult y deserializa filters. */
@Injectable()
export class ApiResultInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse && event.status === HttpStatusCode.Ok) {
          // Order de ApiResult.
          if (Object.hasOwn(event.body, 'order') && event.body.order.length) {
            event.body.order = JSON.parse(event.body.order) as ApiResultItemOrderBy;
          } else if (Object.hasOwn(event.body, 'order')) {
            event.body.order = '';
          }

          // Filtros de ApiResult.
          if (Object.hasOwn(event.body, 'filters') && event.body.filters.length) {
            event.body.filters = JSON.parse(event.body.filters) as Array<ApiResultItemFilter>;
          } else if (Object.hasOwn(event.body, 'filters')) {
            event.body.filters = [] as Array<ApiResultItemFilter>;
          }
        }

        return event;
      })
    );
  }
}
