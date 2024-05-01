import { Routes } from '@angular/router';

import { EmployeeHolidaysClaimsComponent } from './employee-holidays-claims/employee-holidays-claims.component';
import { EmployeeHolidaysDetailsComponent } from './employee-holidays-details/employee-holidays-details.component';
import { EmployeeHolidaysComponent } from './employee-holidays/employee-holidays.component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeHolidaysComponent,
    title: 'Vacaciones de empleados'
  },
  {
    path: 'claims',
    component: EmployeeHolidaysClaimsComponent,
    title: 'Reclamo de vacaciones'
  },
  {
    path: 'year/:year/employees/:employeeId',
    component: EmployeeHolidaysDetailsComponent,
    title: 'Detalle de vacaciones'
  }
];
