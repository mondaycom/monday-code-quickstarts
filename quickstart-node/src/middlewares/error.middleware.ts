import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '@services/monday-code';

/** Here you can put your error handling logic
 * NOTE: we are using express 5, so each error, even async errors, will get here eventually,
 *       so no need for next(error) in the middlewares before.
 *       Feel free to go to this page and learn more about error handling in express: https://expressjs.com/en/guide/error-handling.html
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  if (statusCode >= 500) {
    LoggerService.getInstance().error(message, err);
  }

  res.status(statusCode).json({
    statusCode,
    message: statusCode === 500 ? 'Internal Server Error' : message,
  });
};

export default errorHandler;
