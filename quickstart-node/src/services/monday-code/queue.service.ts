import { Queue } from '@mondaycom/apps-sdk';
import { MondayCodeQueueManager } from '@my-types/monday-code-sdk';

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

  publishMessage(message: Uint8Array | string, options?: { topicName: string }): Promise<string> {
    return this.mondayCodeQueueManager.publishMessage(message, options);
  }

  validateMessageSecret(secret: string): boolean {
    return this.mondayCodeQueueManager.validateMessageSecret(secret);
  }
}
