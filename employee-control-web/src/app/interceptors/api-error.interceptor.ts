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
import { Observable, finalize, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { logDebug, logWarning } from '../core/errors/log-messages';
import { ValidationError } from '../core/types/validation-error';
import { SiteUrl } from '../core/urls/site-urls';
import { BadRequestErrors } from '../models/bad-request-errors';
import { RefreshTokenResponse } from '../models/refresh-token-response.model';
import { JwtService } from '../services/jwt.service';
import { SnackBarService } from '../services/snackbar.service';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly jwtService = inject(JwtService);
  private readonly snackBarService = inject(SnackBarService);

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
      this.router.navigate([SiteUrl.auth.login]);

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
    this.router.navigateByUrl(SiteUrl.errors.forbidden);
  }

  /** Manejar error BadRequest. */
  private handleBadRequest(errorResponse: HttpErrorResponse): void {
    const errors = errorResponse.error.errors as BadRequestErrors;

    if (Object.hasOwn(errors, ValidationError.NotificationErrors)) {
      errors[ValidationError.NotificationErrors].forEach((error: string) => {
        this.snackBarService.error(error);
      });
    }
  }

  /** Errores 500. */
  private handleUnknownError(): void {
    this.snackBarService.error(
      `Ha ocurrido un error, por favor si el problema persiste póngase en contacto con la administración.`
    );
  }
}
