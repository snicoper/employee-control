/* eslint-disable  no-console */

import { AppEnvironment } from '../config/app-environment';

interface LogSettings {
  key: string;
  color: string;
}

const logSettings = {
  error: { key: 'ERROR', color: '#cc0066' },
  warning: { key: 'WARNING', color: '#cc7a00' },
  info: { key: 'INFO', color: '#4169e1' },
  debug: { key: 'DEBUG', color: '#009933' }
};

const displayLogMessage = (message: string, settings: LogSettings): void => {
  if (AppEnvironment.isDebug) {
    const background = `background: ${settings.color}; color: white`;
    const formatMessage = `%c ${settings.key}: ${message} `;

    switch (settings.key.toString()) {
      case 'ERROR':
        console.error(formatMessage, background);
        break;
      case 'WARNING':
        console.warn(formatMessage, background);
        break;
      case 'INFO':
        console.info(formatMessage, background);
        break;
      case 'DEBUG':
        console.log(formatMessage, background);
        break;
    }
  }
};

/**
 * Muestra message de tipo error solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logError = (message: string): void => {
  displayLogMessage(message, logSettings.error);
};

/**
 * Muestra message de tipo warning solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logWarning = (message: string): void => {
  displayLogMessage(message, logSettings.warning);
};

/**
 * Muestra message de tipo info solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logInfo = (message: string): void => {
  displayLogMessage(message, logSettings.info);
};

/**
 * Muestra message de tipo debug solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logDebug = (message: string): void => {
  displayLogMessage(message, logSettings.debug);
};
