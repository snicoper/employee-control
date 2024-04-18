import { Directive, ElementRef, OnInit, inject, input } from '@angular/core';
import { Role } from '../core/types/role';
import { JwtService } from '../services/jwt.service';

@Directive({
  selector: '[awRequiredRole]',
  standalone: true
})
export class RequiredRoleDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly jwtService = inject(JwtService);

  awRequiredRole = input(Role.Anonymous);

  ngOnInit(): void {
    this.elementRef.nativeElement.style.display = 'none';
    this.checkRole();
  }

  checkRole(): void {
    // Si awRequiredRole es nulo, mostrar siempre.
    if (!this.awRequiredRole) {
      this.elementRef.nativeElement.style.display = 'initial';

      return;
    }

    const isInRole = this.jwtService.isInRole(this.awRequiredRole());
    this.elementRef.nativeElement.style.display = isInRole ? 'initial' : 'none';
  }
}
