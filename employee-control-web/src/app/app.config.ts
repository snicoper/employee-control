import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, LOCALE_ID } from '@angular/core';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TitleStrategy, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CustomDateAdapter } from './core/adapters/custom-date-adapter';
import { AppConfig } from './core/config/app-config';
import { GlobalErrorHandler } from './core/errors/global-error-handler';
import { ApiErrorInterceptor } from './interceptors/api-error.interceptor';
import { ApiResultInterceptor } from './interceptors/api-result.interceptor';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { TemplatePageTitleStrategyService } from './services/template-page-title-strategy.service';

// Locales.
// @see: https://www.angulararchitects.io/en/blog/lazy-loading-locales-with-angular/
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfig) => (): Promise<boolean> => config.load(),
      deps: [AppConfig],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiResultInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500 } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategyService },
    provideLuxonDateAdapter(),
    { provide: DateAdapter, useValue: new CustomDateAdapter('es-ES') },
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
