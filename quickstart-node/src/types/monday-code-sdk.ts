import { Logger, SecretsManager, EnvironmentVariablesManager, Storage, Queue } from '@mondaycom/apps-sdk';

export interface MondayCodeLogger {
  info: InstanceType<typeof Logger>['info'];
  warn: InstanceType<typeof Logger>['warn'];
  error: InstanceType<typeof Logger>['error'];
  debug: InstanceType<typeof Logger>['debug'];
}

export interface MondayCodeSecretsManager {
  get: InstanceType<typeof SecretsManager>['get'];
  getKeys: InstanceType<typeof SecretsManager>['getKeys'];
}

export interface MondayCodeEnvironmentVariablesManager {
  get: InstanceType<typeof EnvironmentVariablesManager>['get'];
  getKeys: InstanceType<typeof EnvironmentVariablesManager>['getKeys'];
}

export interface MondayCodeStorageManager {
  get: InstanceType<typeof Storage>['get'];
  set: InstanceType<typeof Storage>['set'];
  delete: InstanceType<typeof Storage>['delete'];
}

export interface MondayCodeQueueManager {
  publishMessage: InstanceType<typeof Queue>['publishMessage'];
}
