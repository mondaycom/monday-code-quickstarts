export interface LogOptions {
  error?: Error;
}

export interface GetKeyOptions {
  invalidate?: boolean;
}

export interface MondayCodeLogger {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string, options?: LogOptions) => void;
  debug: (message: string) => void;
}

export interface MondayCodeSecretsManager {
  get: (key: string, options?: GetKeyOptions) => string;
}

export interface MondayCodeEnvironmentVariablesManager {
  get: (key: string, options?: GetKeyOptions) => string;
}

export interface MondayCodeStorageManager {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  delete: (key: string) => any;
}

export interface PublishMessageOptions {
  topicName?: string;
}

export interface MondayCodeQueueManager {
  publishMessage: (message: string, options?: PublishMessageOptions) => void;
}

export interface MondayCode {
  environmentVariablesManager: MondayCodeEnvironmentVariablesManager;
  secretsManager: MondayCodeSecretsManager;
  logger: MondayCodeLogger;
  storageManager: MondayCodeStorageManager;
  queueManager: MondayCodeQueueManager;
}
