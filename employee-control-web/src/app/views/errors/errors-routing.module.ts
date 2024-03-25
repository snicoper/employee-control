import { Routes } from '@angular/router';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';

export const routes: Routes = [
  {
    path: '403',
    component: Error403Component,
    title: 'Sin autorización'
  },
  {
    path: '404',
    component: Error404Component,
    title: 'Página no encontrada'
  }
];
