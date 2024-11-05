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
 * Simple route just for sanity test and see a simple usage of monday API SDK
 */
mondayRouter.post('/me', async (req: Request, res: Response) => {
  const me = await MondayService.getMe();
  res.status(200).json(me);
});

mondayRouter.use(mondayApiErrorHandler);

export default mondayRouter;
