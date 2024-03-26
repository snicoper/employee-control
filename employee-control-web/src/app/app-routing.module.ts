import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from './core/types/roles';
import { AuthGuard } from './guards/_index';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/home/home-routing.module').then((m) => m.routes)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./views/accounts/accounts-routing.module').then((m) => m.routes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth-routing.module').then((m) => m.routes)
  },
  {
    path: 'category-absences',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/category-absences/category-absences-routing.module').then((m) => m.routes)
  },
  {
    path: 'company-settings',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/company-settings/company-settings-routing.module').then((m) => m.routes)
  },
  {
    path: 'tasks',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/company-tasks/company-tasks-routing.module').then((m) => m.routes)
  },
  {
    path: 'dashboard',
    data: { roles: [Roles.employee] },
    loadChildren: () => import('./views/dashboard/dashboard-routing.module').then((m) => m.routes)
  },
  {
    path: 'departments',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/departments/departments-routing.module').then((m) => m.routes)
  },
  {
    path: 'employee-holidays',
    data: { roles: [Roles.employee] },
    loadChildren: () => import('./views/employee-holidays/employee-holidays-routing.module').then((m) => m.routes)
  },
  {
    path: 'employees',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/employees/employees-routing.module').then((m) => m.routes)
  },
  {
    path: 'manage-holidays',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/manage-holidays/manage-holidays-routing.module').then((m) => m.routes)
  },
  {
    path: 'errors',
    loadChildren: () => import('./views/errors/errors-routing.module').then((m) => m.routes)
  },
  {
    path: 'tests',
    data: { roles: [Roles.siteAdmin] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/tests/tests-routing.module').then((m) => m.routes)
  },
  {
    path: 'time-control-records',
    data: { roles: [Roles.enterpriseStaff] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/time-control-records/time-control-records-routing.module').then((m) => m.routes)
  },
  {
    path: 'times-control',
    data: { roles: [Roles.employee] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/times-control/times-control-routing.module').then((m) => m.routes)
  },
  {
    path: '**',
    redirectTo: '/errors/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
