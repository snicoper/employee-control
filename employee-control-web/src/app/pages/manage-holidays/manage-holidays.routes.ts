import { Routes } from '@angular/router';

import { HolidaysAssignComponent } from './holidays-assign/holidays-assign.component';
import { HolidaysAssignedComponent } from './holidays-assigned/holidays-assigned.component';
import { HolidaysClaimComponent } from './holidays-claim/holidays-claim.component';
import { HolidaysDetailsComponent } from './holidays-details/holidays-details.component';

export const routes: Routes = [
  { path: 'assigned', component: HolidaysAssignedComponent },
  { path: 'assign', component: HolidaysAssignComponent },
  { path: 'claims', component: HolidaysClaimComponent },
  { path: ':id/details', component: HolidaysDetailsComponent }
];
