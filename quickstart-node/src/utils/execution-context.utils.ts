import { AsyncLocalStorage } from 'async_hooks';
import { ExecutionContext } from '@my-types/execution-context';
import { NotFound } from 'http-errors';

export const executionContext = new AsyncLocalStorage<ExecutionContext>();

export const getValueFromExecutionContext = <T extends keyof ExecutionContext>(
  key: T,
  throwOnUndefined: boolean = true,
): ExecutionContext[T] | undefined => {
  const store = executionContext.getStore();

  if (store && key in store) {
    return store[key];
  }

  if (throwOnUndefined) throw new NotFound(`The key: ${key} was not found in the execution context`);
};
