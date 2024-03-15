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
    path: 'account',
    loadChildren: () => import('@aw/views/accounts/accounts.module').then((m) => m.AccountsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('@aw/views/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'category-absence',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@aw/views/category-absences/category-absences.module').then((m) => m.CategoryAbsencesModule)
  },
  {
    path: 'company-setting',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@aw/views/company-settings/company-settings.module').then((m) => m.CompanySettingsModule)
  },
  {
    path: 'task',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('@aw/views/company-tasks/company-tasks.module').then((m) => m.CompanyTasksModule)
  },
  {
    path: 'dashboard',
    data: { roles: [Roles.employee] },
    loadChildren: () => import('@aw/views/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'department',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('@aw/views/departments/departments.module').then((m) => m.DepartmentsModule)
  },
  {
    path: 'employee-holiday',
    data: { roles: [Roles.employee] },
    loadChildren: () =>
      import('@aw/views/employee-holidays/employee-holidays.module').then((m) => m.EmployeeHolidaysModule)
  },
  {
    path: 'employee',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('@aw/views/employees/employees.module').then((m) => m.EmployeesModule)
  },
  {
    path: 'manage-holiday',
    data: { roles: [Roles.humanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('@aw/views/manage-holidays/manage-holidays.module').then((m) => m.ManageHolidaysModule)
  },
  {
    path: 'error',
    loadChildren: () => import('@aw/views/errors/errors.module').then((m) => m.ErrorsModule)
  },
  {
    path: 'test',
    data: { roles: [Roles.siteAdmin] },
    canActivate: [AuthGuard],
    loadChildren: () => import('@aw/views/tests/tests.module').then((m) => m.TestsModule)
  },
  {
    path: 'time-control-record',
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
    redirectTo: '/error/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
