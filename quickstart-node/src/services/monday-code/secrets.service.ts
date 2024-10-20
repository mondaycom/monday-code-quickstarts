import { SecretsManager } from '@mondaycom/apps-sdk';
import { GetKeyOptions, JsonValue, MondayCodeKeyValueManager } from '@my-types/monday-code-sdk';

export class SecretsService implements MondayCodeKeyValueManager {
  // eslint-disable-next-line no-use-before-define
  public static instance: SecretsService = new SecretsService();
  private mondayCodeSecretsManager = new SecretsManager();

  private constructor() {}

  get(key: string, options?: GetKeyOptions): JsonValue | undefined {
    return this.mondayCodeSecretsManager.get(key, options);
  }

  getKeys(options?: GetKeyOptions): Array<string> {
    return this.mondayCodeSecretsManager.getKeys(options);
  }
}
