import express from 'express';
import { Request, Response } from 'express';
import { LoggerService, QueueService } from '@services/monday-code';
import { Unauthorized } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { HttpStatusCode } from 'axios';
import bodyParser from 'body-parser';

const mondayQueueRouter = express.Router();

/**
 * This route will receive the callback from our queue and process it,
 * Letting the queue wait instead of the user
 */
mondayQueueRouter.post('/mndy-queue', bodyParser.json(), async (req: Request, res: Response) => {
  const { secret } = req.query;
  // Validates that the request is triggered by monday code
  if (!(typeof secret === 'string') || !QueueService.getInstance().validateMessageSecret(secret)) {
    LoggerService.getInstance().warn('Queue message received is not valid, since secret does not match');
    throw new Unauthorized('Not authorized to use monday queue');
  }
  const data = req.body;

  try {
    await QueueService.getInstance().parseQueueMessage(data);
    res.status(StatusCodes.OK).send('Received');
  } catch (err) {
    const genericErrorMessage = 'Error occurred during parse queue message';
    LoggerService.getInstance().error(err.message || genericErrorMessage, err);
    res.status(err.status || HttpStatusCode.BadRequest).send(genericErrorMessage);
  }
});

export default mondayQueueRouter;
