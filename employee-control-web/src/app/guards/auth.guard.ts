import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { logDebug } from '../core/errors/log-messages';
import { Role } from '../core/types/role';
import { SiteUrl } from '../core/urls/site-urls';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { SnackBarService } from '../services/snackbar.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly jwtService = inject(JwtService);
  private readonly snackBarService = inject(SnackBarService);

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const { roles } = route.data;

    // Si requiere Role.Anonymous, omite el resto de validaciones.
    if (roles.find((role: Role) => role === Role.Anonymous)) {
      return true;
    }

    if (!this.authService.authValue$() || !this.jwtService.existsTokens()) {
      this.redirectToLogin(state.url);

      return false;
    }

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
    this.snackBarService.error('Requiere autorización para acceder a la página.');
    this.router.navigate([SiteUrl.auth.login], { queryParams: { returnUrl: redirectUrl } });
  }
}
