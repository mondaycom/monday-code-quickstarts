import { Logger } from '@mondaycom/apps-sdk';
import { MondayCodeLogger } from '@my-types/monday-code-sdk';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageJson = require('../../../package.json');

export class LoggerService implements MondayCodeLogger {
  // eslint-disable-next-line no-use-before-define
  public static instance: LoggerService = new LoggerService();
  private mondayCodeLoggerManager = new Logger(packageJson.name || 'my-app');

  debug(message: string): void {
    return this.mondayCodeLoggerManager.debug(message);
  }

  error(message: string, error: Error): void {
    return this.mondayCodeLoggerManager.error(message, { error });
  }

  info(message: string): void {
    return this.mondayCodeLoggerManager.info(message);
  }

  warn(message: string): void {
    return this.mondayCodeLoggerManager.warn(message);
  }
}
