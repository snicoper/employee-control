import { Routes } from '@angular/router';
import { Roles } from '@aw/core/types/roles';
import { AuthGuard } from '@aw/guards/auth.guard';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Inicio',
    data: { roles: [Roles.employee] },
    canActivate: [AuthGuard]
  }
];
