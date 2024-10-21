import { SecretsManager } from '@mondaycom/apps-sdk';
import { GetKeyOptions, GetKeysOptions, JsonValue, MondayCodeKeyValueManager } from '@my-types/monday-code-sdk';
import { validateMondayCodeKeyValue } from '@utils/error.utils';

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
    const value = this.mondayCodeSecretsManager.get(key, options);

    if (options?.throwOnUndefined) validateMondayCodeKeyValue(value, key, SecretsService.name);

    return this.mondayCodeSecretsManager.get(key, options);
  }

  getKeys(options?: GetKeysOptions): Array<string> {
    return this.mondayCodeSecretsManager.getKeys(options);
  }
}
