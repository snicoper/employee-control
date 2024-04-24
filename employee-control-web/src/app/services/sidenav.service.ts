import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private readonly sidenavState$ = signal(true);
  private readonly sidenavToolbarState$ = signal(false);

  readonly sidenavState = computed(() => this.sidenavState$());
  readonly sidenavToolbarState = computed(() => this.sidenavToolbarState$());

  toggleSidenavState(): void {
    this.sidenavState$.set(!this.sidenavState$());
  }

  toggleSidenavToolbarState(): void {
    this.sidenavToolbarState$.set(!this.sidenavToolbarState$());
  }
}
