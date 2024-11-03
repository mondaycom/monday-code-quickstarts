import express from 'express';
import { Request, Response } from 'express';
import { mondayRequestAuth } from '@middlewares/auth.middleware';
import { MondayService } from '@services/monday.service';
import { mondayApiErrorHandler, setMondayApiClient } from '@middlewares/monday-api.middleware';
import bodyParser from 'body-parser';

const mondayRouter = express.Router();

mondayRouter.use(bodyParser.json());
mondayRouter.use(mondayRequestAuth);
mondayRouter.use(setMondayApiClient);

mondayRouter.post('/change-last-item-status', async (req: Request, res: Response) => {
  const { payload } = req.body;

  const { inputFields } = payload;
  const { boardId, groupId, statusColumnId, dateColumnId, statusColumnValue } = inputFields;

  const item = await MondayService.getLastItemInGroupByDate(boardId, groupId, dateColumnId);
  if (
    !MondayService.isItemColumnValueDifferent(
      item,
      statusColumnId,
      (value) => JSON.parse(value)?.index === statusColumnValue?.index,
    )
  ) {
    await MondayService.changeColumnValue(JSON.stringify(statusColumnValue), item.id, boardId, statusColumnId);
  }

  res.status(200).send('success');
});

/**
 * This route throws error from the api on purpose to show how the mondayApiMiddleware handles it:
 * The monday api will throw graphql error -> the monday api error middleware will catch it ->
 * throws a bad request to the client and logs an error with appropriate message
 */
mondayRouter.post('/error-handle-example', async (req: Request, res: Response) => {
  await MondayService.createItem('99999999', 'foo');
  res.status(200).send('If it got here, the function did not throw any errors for some reason');
});

mondayRouter.use(mondayApiErrorHandler);

export default mondayRouter;
