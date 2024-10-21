import { MondayCodeKeyNotFoundError } from '@errors/monday-code.error';

export const validateMondayCodeKeyValue = (value: any, key: string, service: string): void => {
  if (!value) {
    throw new MondayCodeKeyNotFoundError(`In ${service}, the key: "${key}" was not found`);
  }
};
