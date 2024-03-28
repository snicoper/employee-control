import { Injectable, inject } from '@angular/core';
import { LocalStorageKeys } from '../../../core/types/local-storage-keys';
import { LocalStorageService } from '../../../services/local-storage.service';
import { sidebarMenu } from './sidebar-menu';
import { SidebarMenu } from './sidebar-menu-types.model';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly sidebarMenu: SidebarMenu[];

  constructor() {
    const sidebar = this.loadFromLocalStorage();
    this.sidebarMenu = sidebar ?? sidebarMenu;
  }

  activeMenu(title: string): void {
    this.sidebarMenu.forEach((sidebarMenu: SidebarMenu) => {
      if (sidebarMenu.title === title) {
        sidebarMenu.active = !sidebarMenu.active;
      } else {
        sidebarMenu.active = false;
      }
    });

    this.saveToLocalStorage();
  }

  getMenuList(): SidebarMenu[] {
    return this.sidebarMenu;
  }

  private loadFromLocalStorage(): SidebarMenu[] {
    return this.localStorageService.getParse<SidebarMenu[]>(LocalStorageKeys.sidebar);
  }

  private saveToLocalStorage(): void {
    this.localStorageService.setObject<SidebarMenu[]>(LocalStorageKeys.sidebar, this.sidebarMenu);
  }
}
