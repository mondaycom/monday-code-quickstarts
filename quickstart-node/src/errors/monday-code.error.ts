import { BaseError } from '@errors/base.error';
import { StatusCodes } from 'http-status-codes';

export class MondayCodeKeyNotFoundError extends BaseError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  logging = true;

  constructor(message: string) {
    super(message);
  }
}
