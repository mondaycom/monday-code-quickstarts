import { Storage } from '@mondaycom/apps-sdk';
import { Unauthorized } from 'http-errors';
import {
  MondayCodeStorageManager,
  StorageOptions,
  StorageDeleteResponse,
  StorageGetResponse,
  StorageSetResponse,
  JsonValue,
} from '@my-types/monday-code-sdk';

export class StorageService implements MondayCodeStorageManager {
  private mondayCodeStorageManager;

  constructor(token: string) {
    if (!token) {
      throw new Unauthorized('Missing access token, can not access monday code storage');
    }

    this.mondayCodeStorageManager = new Storage(token);
  }

  delete(key: string, options?: StorageOptions): Promise<StorageDeleteResponse> {
    return this.mondayCodeStorageManager.delete(key, options);
  }

  get<T extends JsonValue>(key: string, options?: StorageOptions): Promise<StorageGetResponse<T>> {
    return this.mondayCodeStorageManager.get<T>(key, options);
  }

  set<T extends JsonValue>(key: string, value: T, options?: StorageOptions): Promise<StorageSetResponse> {
    return this.mondayCodeStorageManager.set(key, value, options);
  }
}
