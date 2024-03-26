import { Routes } from '@angular/router';
import { Roles } from '../../core/types/_index';
import { AuthGuard } from '../../guards/_index';
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
