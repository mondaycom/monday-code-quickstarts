import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '@services/monday-code';
import { HttpStatusCode } from 'axios';
import { ApiClient, ClientError } from '@mondaydotcomorg/api';
import { Unauthorized } from 'http-errors';
import { executionContext } from '@utils/execution-context.utils';
import { UPDATED_MONDAY_API_VERSION } from '@services/monday.service';

/**
 * Here we handle error relating to monday Platform API, feel free to change it to your liking
 */
export const mondayApiErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Check if the error we got is from the monday graphql api
  if (err instanceof ClientError) {
    LoggerService.getInstance().error('Monday Platform API error occurred', err);
    res.status(HttpStatusCode.BadRequest).send('An error occurred during the request to monday');
  } else {
    next(err);
  }
};

/**
 * Here we save the monday Platform API client in local Async Storage for a seamless usage experience with the Monday service.
 * Always use it after the monday auth middleware.
 */
export const setMondayApiClient = (req: Request, res: Response, next: NextFunction) => {
  const { shortLivedToken } = req.session;

  if (!shortLivedToken) {
    throw new Unauthorized('Missing Authorization Token');
  }

  executionContext.run(
    {
      mondayApiClient: new ApiClient({
        token: shortLivedToken,
        apiVersion: UPDATED_MONDAY_API_VERSION,
      }),
    },
    () => next(),
  );
};
