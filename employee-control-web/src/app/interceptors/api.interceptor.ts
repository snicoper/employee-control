import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalizationService } from '../core/features/localizations/_index';
import { JwtService } from '../services/_index';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private readonly jwtService = inject(JwtService);
  private readonly localizationService = inject(LocalizationService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.jwtService.getToken();

    if (token && !request.headers.has('Authorization')) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    if (!request.headers.has('Accept-Language')) {
      request = request.clone({
        headers: request.headers.set('Accept-Language', this.localizationService.getLocaleValue())
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }

    return next.handle(request);
  }
}
