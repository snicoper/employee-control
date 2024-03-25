import { Routes } from '@angular/router';
import { RecoveryPasswordChangeComponent } from './recovery-password-change/recovery-password-change.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { RegisterValidateComponent } from './register-validate/register-validate.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registro de nuevo usuario'
  },
  {
    path: 'register-success',
    component: RegisterSuccessComponent,
    title: 'Registro completado'
  },
  {
    path: 'register-validate',
    component: RegisterValidateComponent,
    title: 'Validación de registro'
  },
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
