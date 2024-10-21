import express from 'express';
import { Request, Response } from 'express';
import { BadRequest, InternalServerError } from 'http-errors';
import { EnvironmentVariablesService, SecureStorageService } from '@services/monday-code';
import { JWTService } from '@services/jwt.service';
import { mondayRequestAuth } from '@middlewares/auth.middleware';
import { generateUrlSafeString } from '@utils/url.utils';
import { EnvironmentsKeys } from '@shared/monday-auth-consts';

const authRouter = express.Router();

// Validates the state parameter from the OAuth2 callback.
const validateState = (req: Request) => {
  const returnedState = req.query.state as string;
  const savedState = req.cookies?.state;
  if (returnedState !== savedState) {
    throw new BadRequest('Invalid state parameter');
  } else if (!req.cookies?.user_id) {
    throw new InternalServerError('"user_id" is not defined');
  }
};

authRouter.get('/', mondayRequestAuth, async (req: Request, res: Response) => {
  const userId = String(req.session?.userId);
  const backToUrl = req.session?.backToUrl;

  const connection = await SecureStorageService.getInstance().get<any>(userId);
  if (connection && connection.monday_token) {
    return res.redirect(backToUrl);
  }

  await SecureStorageService.getInstance().set(userId, { back_to_url: backToUrl });

  // Generate a random state for CSRF protection
  const state = generateUrlSafeString(16);

  // Prepare OAuth2 parameters
  const params = new URLSearchParams({
    client_id: EnvironmentVariablesService.getInstance().get(EnvironmentsKeys.MONDAY_OAUTH_CLIENT_ID) as string,
    state: state,
  });

  const redirectUrl = new URL(
    EnvironmentVariablesService.getInstance().get(EnvironmentsKeys.MONDAY_OAUTH_BASE_PATH) as string,
  );
  redirectUrl.search = params.toString();

  res.cookie('user_id', userId);
  res.cookie('state', state); // Save the state in a cookie for later validation

  return res.redirect(redirectUrl.toString());
});

authRouter.get('/monday/callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const userId = req.cookies?.user_id;

  // Validate the state parameter
  validateState(req);

  const mondayToken = await JWTService.getMondayToken(code);

  const backToUrl = ((await SecureStorageService.getInstance().get(userId)) as any)?.back_to_url;
  await SecureStorageService.getInstance().set(userId, { monday_token: mondayToken });

  return res.redirect(backToUrl);
});

export default authRouter;
