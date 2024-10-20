import { Queue } from '@mondaycom/apps-sdk';
import { MondayCodeQueueManager } from '@my-types/monday-code-sdk';

export class QueueService implements MondayCodeQueueManager {
  // eslint-disable-next-line no-use-before-define
  public static instance: QueueService = new QueueService();
  private mondayCodeQueueManager = new Queue();

  private constructor() {}

  publishMessage(message: Uint8Array | string, options?: { topicName: string }): Promise<string> {
    return this.mondayCodeQueueManager.publishMessage(message, options);
  }

  validateMessageSecret(secret: string): boolean {
    return this.mondayCodeQueueManager.validateMessageSecret(secret);
  }
}
