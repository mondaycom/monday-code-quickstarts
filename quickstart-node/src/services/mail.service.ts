import { LoggerService } from '@services/monday-code';

export class MailService {
  // eslint-disable-next-line no-use-before-define
  private static instance: MailService;

  private constructor() {}

  static getInstance(): MailService {
    if (!this.instance) {
      this.instance = new MailService();
    }

    return this.instance;
  }

  sendMail(mailAddress: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        // Put here send email logic
        LoggerService.getInstance().info(`Sending mail to ${mailAddress} with content: ${message}`);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}
