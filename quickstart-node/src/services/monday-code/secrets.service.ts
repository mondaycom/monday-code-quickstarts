import { SecretsManager } from '@mondaycom/apps-sdk';
import { GetKeyOptions, JsonValue, MondayCodeKeyValueManager } from '@my-types/monday-code-sdk';

export class SecretsService implements MondayCodeKeyValueManager {
  // eslint-disable-next-line no-use-before-define
  private static instance: SecretsService;
  private mondayCodeSecretsManager;

  private constructor() {
    this.mondayCodeSecretsManager = new SecretsManager();
  }

  static getInstance(): SecretsService {
    if (!this.instance) {
      this.instance = new SecretsService();
    }

    return this.instance;
  }

  get(key: string, options?: GetKeyOptions): JsonValue | undefined {
    return this.mondayCodeSecretsManager.get(key, options);
  }

  getKeys(options?: GetKeyOptions): Array<string> {
    return this.mondayCodeSecretsManager.getKeys(options);
  }
}
