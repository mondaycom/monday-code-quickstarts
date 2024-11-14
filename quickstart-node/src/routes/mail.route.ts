import express, { Request, Response } from 'express';
import { mondayRequestAuth } from '@middlewares/auth.middleware';
import { QueueService, StorageService, SecureStorageService } from '@services/monday-code';
import { BadRequest, Unauthorized } from 'http-errors';
import { QueueMethods } from '@shared/queue.consts';

const mailRouter = express.Router();

// Example of a route that receives a POST request and calls the Queue Service to handle the process in the background.
mailRouter.post('/send', mondayRequestAuth, async (req: Request, res: Response) => {
  const userId = req.session?.userId;
  const payload = req.body?.payload;

  if (!userId) {
    throw new BadRequest('User ID not found');
  }

  // In real world scenarios, the relevant content and address can be extracted a graphQL query to monday's API
  // using the boardId and other input fields set in the workflow blocks in Monday developer center
  const boardId = payload?.inputFields?.boardId || 'Example Board ID';
  const content = `Some trigger just ran! check the board - ${boardId}`;
  const address = 'admin.mail@example.com';

  // Get monday token securely
  const userTokenData = await SecureStorageService.getInstance().get<any>(userId);
  const mondayAccessToken = userTokenData?.mondayToken?.access_token;

  if (!mondayAccessToken) {
    throw new Unauthorized('Not authorized, monday access token not found');
  }

  // Example of StorageService usage: save mail address
  await new StorageService(mondayAccessToken).set('mailAddress', address);

  // Publish message to QueueService
  await QueueService.getInstance().publishMessage({
    method: QueueMethods.SEND_EMAIL,
    content,
    userToken: mondayAccessToken,
  });

  res.status(200).send('Received');
});

export default mailRouter;
