import { HttpRequest } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { BrowserStorageKey } from '../core/types/browser-storage-key';
import { Role } from '../core/types/role';
import { ApiUrl } from '../core/urls/api-urls';
import { SiteUrl } from '../core/urls/site-urls';
import { RefreshTokenRequest } from '../models/refresh-token-request.model';
import { RefreshTokenResponse } from '../models/refresh-token-response.model';
import { AuthApiService } from './api/auth-api.service';
import { AuthService } from './auth.service';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({ providedIn: 'root' })
export class JwtService {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly authApiService = inject(AuthApiService);
  private readonly browserStorageService = inject(BrowserStorageService);

  /** Comprueba si el token se esta refrescando. */
  readonly isRefreshing$ = signal(false);

  /** Último valor de refresco. */
  readonly refreshedTokens$ = signal<RefreshTokenResponse | null>(null);

  /** Token data. */
  private tokenDecode: { [key: string]: unknown } = {};
  private accessToken = '';
  private refreshToken = '';

  constructor() {
    const accessToken = this.browserStorageService.get(BrowserStorageKey.AccessToken);
    const refreshToken = this.browserStorageService.get(BrowserStorageKey.RefreshToken);

    this.setTokens(accessToken, refreshToken, false);
  }

  setTokens(accessToken: string, refreshToken: string, storeTokens = true): void {
    if (!accessToken || !refreshToken) {
      return;
    }

    this.tokenDecode = jwtDecode(accessToken);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    if (storeTokens) {
      this.browserStorageService.set(BrowserStorageKey.AccessToken, accessToken);
      this.browserStorageService.set(BrowserStorageKey.RefreshToken, refreshToken);
    }

    this.authService.setAuthValue(true);
  }

  setHeaderAuthorization(request: HttpRequest<unknown>): HttpRequest<unknown> {
    if (this.accessToken && !request.headers.has('Authorization')) {
      return request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.accessToken}`)
      });
    }

    return request;
  }

  refreshingTokens(): Observable<RefreshTokenResponse> {
    const model = { refreshToken: this.refreshToken } as RefreshTokenRequest;

    return this.authApiService.post<RefreshTokenRequest, RefreshTokenResponse>(model, ApiUrl.auth.refreshToken).pipe(
      tap((result) => {
        this.setTokens(result.accessToken, result.refreshToken);
      })
    );
  }

  isExpired(): boolean {
    if (!this.accessToken || !this.tokenDecode) {
      return true;
    }

    const expiry = this.tokenDecode['exp'] as number;

    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  getToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  existsTokens(): boolean {
    return !!(this.accessToken && this.refreshToken);
  }

  isInRole(role: Role): boolean {
    return this.getRoles().includes(role);
  }

  getRole(role: string): Array<string> | string {
    const index = this.getRoles().indexOf(role);

    return index >= 0 ? this.getRoles()[index] : '';
  }

  getRoles(): Array<string> {
    const key = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

    if (!this.accessToken || !(key in this.tokenDecode)) {
      return [];
    }

    return this.tokenDecode[key] as Array<string>;
  }

  getName(): string {
    const key = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

    if (!this.accessToken || !(key in this.tokenDecode)) {
      return '';
    }

    return this.tokenDecode[key] as string;
  }

  getSid(): string {
    const key = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid';

    if (!this.accessToken || !(key in this.tokenDecode)) {
      return '';
    }

    return this.tokenDecode[key] as string;
  }

  removeTokens(): void {
    this.browserStorageService.remove(BrowserStorageKey.RefreshToken);
    this.browserStorageService.remove(BrowserStorageKey.AccessToken);
    this.refreshToken = '';
    this.accessToken = '';
    this.tokenDecode = {};

    this.authService.setAuthValue(false);

    this.router.navigateByUrl(SiteUrl.auth.login);
  }
}
