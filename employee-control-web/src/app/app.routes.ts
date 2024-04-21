import { Routes } from '@angular/router';
import { Role } from './core/types/role';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    data: { roles: [Role.Employee] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.routes)
  },
  {
    path: 'accounts',
    data: { roles: [Role.Anonymous] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/accounts/accounts.routes').then((m) => m.routes)
  },
  {
    path: 'auth',
    data: { roles: [Role.Anonymous] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.routes)
  },
  {
    path: 'category-absences',
    data: { roles: [Role.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/category-absences/category-absences.routes').then((m) => m.routes)
  },
  {
    path: 'company-calendar',
    data: { roles: [Role.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/company-calendar/company-calendar.routes').then((m) => m.routes)
  },
  {
    path: 'company-settings',
    data: { roles: [Role.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/company-settings/company-settings.routes').then((m) => m.routes)
  },
  {
    path: 'tasks',
    data: { roles: [Role.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/company-tasks/company-tasks.routes').then((m) => m.routes)
  },
  {
    path: 'dashboard',
    data: { roles: [Role.Employee] },
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.routes)
  },
  {
    path: 'employee-settings',
    data: { roles: [Role.Employee] },
    loadChildren: () => import('./pages/employee-settings/employee-settings.routes').then((m) => m.routes)
  },
  {
    path: 'departments',
    data: { roles: [Role.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/departments/departments.routes').then((m) => m.routes)
  },
  {
    path: 'employees',
    data: { roles: [Role.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/employees/employees.routes').then((m) => m.routes)
  },
  {
    path: 'errors',
    data: { roles: [Role.Anonymous] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/errors/errors.routes').then((m) => m.routes)
  },
  {
    path: 'manage-holidays',
    data: { roles: [Role.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/manage-holidays/manage-holidays.routes').then((m) => m.routes)
  },
  {
    path: 'time-control-records',
    data: { roles: [Role.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/time-control-records/time-control-records.routes').then((m) => m.routes)
  },
  {
    path: 'times-control-progress',
    data: { roles: [Role.Employee] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/times-control-progress/times-control-progress.routes').then((m) => m.routes)
  },
  {
    path: 'tests',
    data: { roles: [Role.Employee] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tests/tests.routes').then((m) => m.routes)
  },
  {
    path: '**',
    redirectTo: '/errors/404',
    pathMatch: 'full'
  }
];
