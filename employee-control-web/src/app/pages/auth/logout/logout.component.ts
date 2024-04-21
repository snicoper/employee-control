import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserStorageKey } from '../../../core/types/browser-storage-key';
import { SiteUrl } from '../../../core/urls/site-urls';
import { BrowserStorageService } from '../../../services/browser-storage.service';
import { JwtService } from '../../../services/jwt.service';
import { UserStatesService } from '../../../services/states/user-states.service';

@Component({
  selector: 'aw-logout',
  standalone: true,
  template: ''
})
export class LogoutComponent {
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);
  private readonly userStatesService = inject(UserStatesService);
  private readonly browserStorageService = inject(BrowserStorageService);

  constructor() {
    this.jwtService.removeTokens();
    this.userStatesService.clean();
    this.browserStorageService.remove(BrowserStorageKey.Sidenav);
    this.router.navigateByUrl(SiteUrl.auth.login);
  }
}
