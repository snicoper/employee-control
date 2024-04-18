/**
 * Constantes de formulario globales.
 * Convenciones con el backend de los errores de validación.
 */
export enum ValidationError {
  /** Errores del formulario. */
  NonFieldErrors = 'nonFieldErrors',

  /** Errores de notificación, abrirá un toast. */
  NotificationErrors = 'notificationErrors'
}
