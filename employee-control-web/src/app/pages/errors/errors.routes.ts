import { Routes } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '403',
    component: ForbiddenComponent,
    title: 'Sin autorización'
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: 'Página no encontrada'
  }
];
