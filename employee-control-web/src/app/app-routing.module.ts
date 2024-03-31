import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from './core/types/roles';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard-routing.module').then((m) => m.routes)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./pages/accounts/accounts-routing.module').then((m) => m.routes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth-routing.module').then((m) => m.routes)
  },
  {
    path: 'category-absences',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/category-absences/category-absences-routing.module').then((m) => m.routes)
  },
  {
    path: 'company-holidays-manage',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/company-holidays-manage/company-holidays-manage-routing.module').then((m) => m.routes)
  },
  {
    path: 'company-settings',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/company-settings/company-settings-routing.module').then((m) => m.routes)
  },
  {
    path: 'tasks',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/company-tasks/company-tasks-routing.module').then((m) => m.routes)
  },
  {
    path: 'dashboard',
    data: { roles: [Roles.employee] },
    loadChildren: () => import('./pages/dashboard/dashboard-routing.module').then((m) => m.routes)
  },
  {
    path: 'departments',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/departments/departments-routing.module').then((m) => m.routes)
  },
  {
    path: 'employees',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/employees/employees-routing.module').then((m) => m.routes)
  },
  {
    path: 'errors',
    loadChildren: () => import('./pages/errors/errors-routing.module').then((m) => m.routes)
  },
  {
    path: 'time-control-records',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/time-control-records/time-control-records-routing.module').then((m) => m.routes)
  },
  {
    path: 'times-control-progress',
    data: { roles: [Roles.employee] },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/times-control-progress/times-control-progress-routing.module').then((m) => m.routes)
  },
  {
    path: '**',
    redirectTo: '/errors/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
