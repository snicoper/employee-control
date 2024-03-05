import { ErrorHandler } from '@angular/core';
import { logError } from './log-messages';

export class GlobalErrorHandler implements ErrorHandler {
  // eslint-disable-next-line
  handleError(error: any): void {
    logError(error.message);

    throw error;
  }
}
