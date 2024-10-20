import { SecureStorage } from '@mondaycom/apps-sdk';
import { MondayCodeSecureStorageManager, JsonValue } from '@my-types/monday-code-sdk';

export class SecureStorageService implements MondayCodeSecureStorageManager {
  // eslint-disable-next-line no-use-before-define
  public static instance: SecureStorageService = new SecureStorageService();
  private mondayCodeSecureStorageManager = new SecureStorage();

  private constructor() {}

  delete(key: string): Promise<boolean> {
    return this.mondayCodeSecureStorageManager.delete(key);
  }

  get<T>(key: string): Promise<T | null> {
    return this.mondayCodeSecureStorageManager.get(key);
  }

  set<T extends JsonValue>(key: string, value: T): Promise<boolean> {
    return this.mondayCodeSecureStorageManager.set(key, value);
  }
}
