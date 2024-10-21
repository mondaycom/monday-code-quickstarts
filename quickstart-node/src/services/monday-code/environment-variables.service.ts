import { EnvironmentVariablesManager } from '@mondaycom/apps-sdk';
import { GetKeyOptions, JsonValue, MondayCodeKeyValueManager } from '@my-types/monday-code-sdk';

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
    return this.mondayCodeEnvironmentVariablesManager.get(key, options);
  }

  getKeys(options?: GetKeyOptions): Array<string> {
    return this.mondayCodeEnvironmentVariablesManager.getKeys(options);
  }
}
