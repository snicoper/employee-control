import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from './core/config/app-config';
import { GlobalErrorHandler } from './core/errors/global-error-handler';
import { ApiErrorInterceptor } from './interceptors/api-error.interceptor';
import { ApiResultInterceptor } from './interceptors/api-result.interceptor';
import { ApiInterceptor } from './interceptors/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-right'
      })
    ),
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
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiResultInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
