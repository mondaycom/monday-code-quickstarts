import { EnvironmentVariablesManager } from '@mondaycom/apps-sdk';
import { GetKeyOptions, GetKeysOptions, JsonValue, MondayCodeKeyValueManager } from '@my-types/monday-code-sdk';
import { validateMondayCodeKeyValue } from '@utils/error.utils';

export class EnvironmentVariablesService implements MondayCodeKeyValueManager {
  // eslint-disable-next-line no-use-before-define
  private static instance: EnvironmentVariablesService;
  private mondayCodeEnvironmentVariablesManager;

  private constructor() {
    this.mondayCodeEnvironmentVariablesManager = new EnvironmentVariablesManager();
  }

  static getInstance(): EnvironmentVariablesService {
    if (!this.instance) {
      this.instance = new EnvironmentVariablesService();
    }

    return this.instance;
  }

  get(key: string, options?: GetKeyOptions): JsonValue | undefined {
    const value = this.mondayCodeEnvironmentVariablesManager.get(key, options);

    if (options?.throwOnUndefined) validateMondayCodeKeyValue(value, key, EnvironmentVariablesService.name);

    return value;
  }

  getKeys(options?: GetKeysOptions): Array<string> {
    return this.mondayCodeEnvironmentVariablesManager.getKeys(options);
  }
}
