import { Queue } from '@mondaycom/apps-sdk';
import { MondayCodeQueueManager, QueueMessage } from '@my-types/monday-code-sdk';
import { LoggerService } from '@services/monday-code/logger.service';
import { QueueMethods } from '@shared/queue.consts';
import { StorageService } from '@services/monday-code/storage.service';
import { MailService } from '@services/mail.service';

export class QueueService implements MondayCodeQueueManager {
  // eslint-disable-next-line no-use-before-define
  private static instance: QueueService;
  private mondayCodeQueueManager;

  private constructor() {
    this.mondayCodeQueueManager = new Queue();
  }

  static getInstance(): QueueService {
    if (!this.instance) {
      this.instance = new QueueService();
    }

    return this.instance;
  }

  publishMessage(message: QueueMessage, options?: { topicName: string }): Promise<string> {
    return this.mondayCodeQueueManager.publishMessage(JSON.stringify(message), options);
  }

  validateMessageSecret(secret?: string): boolean {
    return this.mondayCodeQueueManager.validateMessageSecret(secret);
  }

  /**
   * This function will parse the message from the queue to do some long-running process according to its content.
   * This is only an example function, feel free to change it according to your needs
   */
  async parseQueueMessage(message: QueueMessage): Promise<void> {
    LoggerService.getInstance().debug(`Received message: ${JSON.stringify(message)}`);

    if (message.method === QueueMethods.SEND_EMAIL) {
      const mondayAccessToken = message.userToken;
      if (mondayAccessToken) {
        const mailAddress = (await new StorageService(mondayAccessToken).get<string>('mailAddress'))?.value;
        const content = message.content;
        if (mailAddress && content) {
          await MailService.sendMail(mailAddress, content);
        }
      }
    }
  }
}
