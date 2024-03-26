import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { Roles } from '../core/types/_index';
import { JwtService } from '../services/_index';

@Directive({
  selector: '[awRequiredRole]',
  standalone: true
})
export class RequiredRoleDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly jwtService = inject(JwtService);

  @Input() awRequiredRole? = Roles.anonymous;

  ngOnInit(): void {
    this.elementRef.nativeElement.style.display = 'none';
    this.checkRole();
  }

  checkRole(): void {
    // Si awRequiredRole es nulo, mostrar siempre.
    if (!this.awRequiredRole) {
      this.elementRef.nativeElement.style.display = 'block';

      return;
    }

    const isInRole = this.jwtService.isInRole(this.awRequiredRole as string);
    this.elementRef.nativeElement.style.display = isInRole ? 'block' : 'none';
  }
}
