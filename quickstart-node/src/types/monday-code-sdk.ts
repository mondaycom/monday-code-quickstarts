export type JsonValue = string | number | boolean | null | Array<JsonValue> | { [key: string]: JsonValue };

export interface MondayCodeLogger {
  info: (message: string) => void;
  debug: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string, error: Error) => void;
}

export interface GetKeyOptions {
  invalidate?: boolean;
}

export interface MondayCodeKeyValueManager {
  getKeys: (options?: GetKeyOptions) => Array<string>;
  get: (key: string, options?: GetKeyOptions) => JsonValue | undefined;
}

export type StorageOptions = {
  shared?: boolean;
  previousVersion?: string;
};

export type StorageSetResponse = {
  version?: string;
  success: boolean;
  error?: string;
};

export type StorageGetResponse<T extends JsonValue> = {
  success: boolean;
  version?: string;
  value: T | null;
  error?: string;
};

export type StorageDeleteResponse = {
  success: boolean;
  error?: string;
};

export interface MondayCodeStorageManager {
  set: <T extends JsonValue>(key: string, value: T, options?: StorageOptions) => Promise<StorageSetResponse>;
  get: <T extends JsonValue>(key: string, options?: StorageOptions) => Promise<StorageGetResponse<T>>;
  delete: (key: string, options?: StorageOptions) => Promise<StorageDeleteResponse>;
}

export type MondayCodeSecureStorageManager = {
  set: <T extends JsonValue>(key: string, value: T) => Promise<boolean>;
  get: <T extends JsonValue>(key: string) => Promise<T | null>;
  delete: (key: string) => Promise<boolean>;
};

export interface MondayCodeQueueManager {
  publishMessage: (message: Uint8Array | string, options?: { topicName: string }) => Promise<string>;
  validateMessageSecret: (secret: string) => boolean;
}
