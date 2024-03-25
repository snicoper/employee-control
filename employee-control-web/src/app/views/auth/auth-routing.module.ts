import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Inicio de sesión'
  },
  {
    path: 'logout',
    component: LogoutComponent,
    title: 'Cerrar sesión'
  },
  {
    path: '**',
    redirectTo: '/errors/404',
    pathMatch: 'full'
  }
];
