import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  readonly navbarState$ = signal(true);
  readonly sidebarState$ = signal(true);
  readonly footerState$ = signal(true);

  toggleNavbarState(): void {
    this.navbarState$.update((value) => !value);
  }

  toggleSidebarState(): void {
    this.sidebarState$.update((value) => !value);
  }

  toggleFooterState(): void {
    this.footerState$.update((value) => !value);
  }
}
