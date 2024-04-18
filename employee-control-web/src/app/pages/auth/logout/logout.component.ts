import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SiteUrl } from '../../../core/urls/site-urls';
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

  constructor() {
    this.jwtService.removeTokens();
    this.userStatesService.clean();
    this.router.navigateByUrl(SiteUrl.auth.login);
  }
}
