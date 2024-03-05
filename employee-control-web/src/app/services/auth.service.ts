import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth$ = signal(false);

  readonly authValue$ = computed(() => this.auth$());

  setAuthValue(value: boolean): void {
    this.auth$.set(value);
  }
}
