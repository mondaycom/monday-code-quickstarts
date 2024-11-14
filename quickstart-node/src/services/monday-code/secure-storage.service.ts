import { SecureStorage } from '@mondaycom/apps-sdk';
import { MondayCodeSecureStorageManager, JsonValue } from '@my-types/monday-code-sdk';

export class SecureStorageService implements MondayCodeSecureStorageManager {
  // eslint-disable-next-line no-use-before-define
  private static instance: SecureStorageService;
  private mondayCodeSecureStorageManager;

  private constructor() {
    this.mondayCodeSecureStorageManager = new SecureStorage();
  }

  static getInstance(): SecureStorageService {
    if (!this.instance) {
      this.instance = new SecureStorageService();
    }

    return this.instance;
  }

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
