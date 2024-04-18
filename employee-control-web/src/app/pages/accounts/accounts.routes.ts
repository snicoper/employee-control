import { Routes } from '@angular/router';
import { RecoveryPasswordChangeComponent } from './recovery-password-change/recovery-password-change.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

export const routes: Routes = [
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent,
    title: 'Recordar contraseña'
  },
  {
    path: 'recovery-password-change',
    component: RecoveryPasswordChangeComponent,
    title: 'Cambiar contraseña olvidada'
  }
];
