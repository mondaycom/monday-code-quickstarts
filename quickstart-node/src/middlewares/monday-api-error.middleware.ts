import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '@services/monday-code';
import { HttpStatusCode } from 'axios';
import { ClientError } from '@mondaydotcomorg/api';

/**
 * Here we handle error relating to monday api, feel free to change it to your like
 */
const mondayApiErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Check if the error we got is from the monday graphql api
  if (err instanceof ClientError) {
    LoggerService.getInstance().error('Monday API error occurred', err);
    res.status(HttpStatusCode.BadRequest).send('An error occurred during a request to the monday api');
  } else {
    next(err);
  }
};

export default mondayApiErrorHandler;
