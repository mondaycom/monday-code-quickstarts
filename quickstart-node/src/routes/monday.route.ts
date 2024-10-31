import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { mondayRequestAuth } from '@middlewares/auth.middleware';
import { MondayService } from '@services/monday.service';
import { HttpStatusCode } from 'axios';
import mondayApiErrorHandler from '@middlewares/monday-api-error.middleware';
import bodyParser from 'body-parser';

const mondayRouter = express.Router();

mondayRouter.use(bodyParser.json());
mondayRouter.use(mondayRequestAuth);

mondayRouter.post('/update-date-to-now', async (req: Request, res: Response, next: NextFunction) => {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  const { inputFields } = payload;
  const { boardId, itemId, columnId } = inputFields;

  try {
    await MondayService.changeColumnValue(shortLivedToken, new Date().toISOString(), itemId, boardId, columnId);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).send('Update date column failed');
    next(err);
  }
});

mondayRouter.post('/change-last-item-status', async (req: Request, res: Response) => {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  const { inputFields } = payload;
  const { boardId, groupId, statusColumnId, statusColumnValue } = inputFields;

  const item = await MondayService.getLastItemInGroup(shortLivedToken, boardId, groupId);
  await MondayService.changeColumnValue(shortLivedToken, statusColumnValue, item.id, boardId, statusColumnId);

  res.status(200).send('success');
});

/**
 * This route throws error from the api on purpose to show how the mondayApiMiddleware handles it:
 * The monday api will throw not found error -> the monday api error middleware will catch it ->
 * throw a bad request to the client and log an error with appropriate message
 */
mondayRouter.post('/error-handle-example', async (req: Request, res: Response) => {
  const { shortLivedToken } = req.session;

  await MondayService.createItem(shortLivedToken, '99999999', 'foo');

  res.status(200).send('If it got here, the function did not throw any errors for some reason');
});

mondayRouter.use(mondayApiErrorHandler);

export default mondayRouter;
