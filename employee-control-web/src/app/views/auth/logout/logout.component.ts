import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { JwtService } from '@aw/services/_index';

@Component({
    selector: 'aw-logout',
    template: '',
    standalone: true
})
export class LogoutComponent {
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);

  constructor() {
    this.jwtService.removeTokens();
    this.router.navigateByUrl(SiteUrls.auth.login);
  }
}
