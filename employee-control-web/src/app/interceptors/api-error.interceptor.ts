import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, finalize, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { logDebug, logWarning } from '../core/errors/_index';
import { ValidationErrors } from '../core/types/_index';
import { SiteUrls } from '../core/urls/_index';
import { BadRequestErrors, RefreshTokenResponse } from '../models/_index';
import { JwtService } from '../services/_index';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);

  /** Handle error de la aplicación. */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            return this.handleUnauthorized(request, next);
          case HttpStatusCode.NotFound:
            this.handleNotFound(error);
            break;
          case HttpStatusCode.Forbidden:
            this.handleForbidden();
            break;
          case HttpStatusCode.BadRequest:
            this.handleBadRequest(error);
            break;
          case HttpStatusCode.NoContent:
            break;
          default:
            this.handleUnknownError();
        }

        return throwError(() => error);
      })
    );
  }

  /** Manejar error Unauthorized. */
  private handleUnauthorized(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.jwtService.existsTokens()) {
      this.router.navigate([SiteUrls.auth.login]);

      return next.handle(request);
    }

    if (!this.jwtService.isRefreshing$() && this.jwtService.isExpired()) {
      logWarning('Se va a renovar el token...');

      this.jwtService.refreshedTokens$.set(null);
      this.jwtService.isRefreshing$.set(true);

      return this.jwtService.refreshingTokens().pipe(
        finalize(() => this.jwtService.isRefreshing$.set(false)),
        switchMap((result: RefreshTokenResponse) => {
          this.jwtService.refreshedTokens$.set(result);

          request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${result.accessToken}`)
          });

          logDebug('Se a renovado el token con éxito.');

          return next.handle(request);
        }),
        catchError((error: HttpErrorResponse) => throwError(() => error))
      );
    }

    return next.handle(request);
  }

  /** Manejar error NotFound. */
  private handleNotFound(error: HttpErrorResponse): void {
    logWarning(error.error);
  }

  /** Manejar error Forbidden.  */
  private handleForbidden(): void {
    this.router.navigateByUrl(SiteUrls.errors.forbidden);
  }

  /** Manejar error BadRequest. */
  private handleBadRequest(errorResponse: HttpErrorResponse): void {
    const errors = errorResponse.error.errors as BadRequestErrors;

    if (Object.hasOwn(errors, ValidationErrors.notificationErrors)) {
      errors[ValidationErrors.notificationErrors].forEach((error: string) => {
        this.toastrService.error(error);
      });
    }
  }

  /** Errores 500. */
  private handleUnknownError(): void {
    this.toastrService.error(
      `Ha ocurrido un error, por favor si el problema persiste póngase en contacto con la administración.`
    );
  }
}
