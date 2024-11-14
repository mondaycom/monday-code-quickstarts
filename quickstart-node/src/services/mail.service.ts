import { LoggerService } from '@services/monday-code';

const sendMail = (mailAddress: string, message: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      // Put here send email logic
      LoggerService.getInstance().info(`Sending mail to ${mailAddress} with content: ${message}`);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const MailService = {
  sendMail,
};
