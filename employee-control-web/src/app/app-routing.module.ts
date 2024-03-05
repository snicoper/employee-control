import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from './core/types/roles';
import { AuthGuard } from './guards/_index';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@aw/views/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('@aw/views/accounts/accounts.module').then((m) => m.AccountsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('@aw/views/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'category-absences',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@aw/views/category-absence/category-absence.module').then((m) => m.CategoryAbsenceModule)
  },
  {
    path: 'company-settings',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@aw/views/company-settings/company-settings.module').then((m) => m.CompanySettingsModule)
  },
  {
    path: 'tasks',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('@aw/views/company-tasks/company-tasks.module').then((m) => m.CompanyTasksModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@aw/views/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'departments',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('@aw/views/departments/departments.module').then((m) => m.DepartmentsModule)
  },
  {
    path: 'employees',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('@aw/views/employees/employees.module').then((m) => m.EmployeesModule)
  },
  {
    path: 'errors',
    loadChildren: () => import('@aw/views/errors/errors.module').then((m) => m.ErrorsModule)
  },
  {
    path: 'tests',
    data: { roles: [Roles.siteAdmin] },
    canActivate: [AuthGuard],
    loadChildren: () => import('@aw/views/tests/tests.module').then((m) => m.TestsModule)
  },
  {
    path: 'time-control-records',
    data: { roles: [Roles.enterpriseStaff] },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@aw/views/time-control-records/time-control-records.module').then((m) => m.TimeControlRecordsModule)
  },
  {
    path: 'time-control',
    data: { roles: [Roles.employee] },
    canActivate: [AuthGuard],
    loadChildren: () => import('@aw/views/times-control/times-control.module').then((m) => m.TimesControlModule)
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
