import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '@services/monday-code';
import { HttpStatusCode } from 'axios';

const isMondayApiError = (err: any): boolean => {
  return !!(err.response && err.response.status && err.message);
};

/**
 * Here we handle error relating to monday api, feel free to change it to your like
 */
const mondayApiErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (isMondayApiError(err)) {
    LoggerService.getInstance().error(err.message, err);
    res.status(HttpStatusCode.BadRequest).send('An error occurred during a request to the monday api');
  } else {
    next(err);
  }
};

export default mondayApiErrorHandler;
