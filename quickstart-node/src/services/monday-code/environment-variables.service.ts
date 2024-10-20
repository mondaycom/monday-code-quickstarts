import { EnvironmentVariablesManager } from '@mondaycom/apps-sdk';
import { GetKeyOptions, JsonValue, MondayCodeKeyValueManager } from '@my-types/monday-code-sdk';

export class EnvironmentVariablesService implements MondayCodeKeyValueManager {
  // eslint-disable-next-line no-use-before-define
  public static instance: EnvironmentVariablesService = new EnvironmentVariablesService();
  private mondayCodeEnvironmentVariablesManager = new EnvironmentVariablesManager();

  private constructor() {}

  get(key: string, options?: GetKeyOptions): JsonValue | undefined {
    return this.mondayCodeEnvironmentVariablesManager.get(key, options);
  }

  getKeys(options?: GetKeyOptions): Array<string> {
    return this.mondayCodeEnvironmentVariablesManager.getKeys(options);
  }
}
