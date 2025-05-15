import logger from '../config/logger.js';

export class AppLogger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(message: string): string {
    return `[${this.context}] ${message}`;
  }

  info(message: string) {
    logger.info(this.formatMessage(message));
  }

  warn(message: string) {
    logger.warn(this.formatMessage(message));
  }

  error(message: string, error?: unknown) {
    if (error instanceof Error) {
      logger.error(this.formatMessage(`${message} - ${error.message}\n${error.stack}`));
    } else {
      logger.error(this.formatMessage(message));
    }
  }

  debug(message: string) {
    logger.debug(this.formatMessage(message));
  }
}
