import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { logDebug } from '../core/errors/log-messages';
import { SiteUrls } from '../core/urls/site-urls';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly jwtService = inject(JwtService);
  private readonly toastr = inject(ToastrService);

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.authService.authValue$() || !this.jwtService.existsTokens()) {
      this.redirectToLogin(state.url);

      return false;
    }

    const { roles } = route.data;

    if (!roles) {
      return true;
    }

    for (const role of roles) {
      if (!this.jwtService.isInRole(role)) {
        logDebug(`Role requerido para acceder a esta pagina: ${role}`);

        return false;
      }
    }

    return true;
  }

  private redirectToLogin(redirectUrl: string): void {
    this.toastr.error('Requiere autorización para acceder a la página.');
    this.router.navigate([SiteUrls.auth.login], { queryParams: { returnUrl: redirectUrl } });
  }
}
