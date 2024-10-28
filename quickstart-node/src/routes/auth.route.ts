import express from 'express';
import { Request, Response } from 'express';
import { BadRequest, InternalServerError } from 'http-errors';
import { EnvironmentVariablesService, SecureStorageService } from '@services/monday-code';
import { JWTService } from '@services/jwt.service';
import { mondayRequestAuth } from '@middlewares/auth.middleware';
import { generateRandomUrlSafeString } from '@utils/url.utils';
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

  const userDetails = await SecureStorageService.getInstance().get<any>(userId);
  if (userDetails && userDetails.mondayToken) {
    return res.redirect(backToUrl);
  }

  await SecureStorageService.getInstance().set(userId, { backToUrl });

  // The state parameter is used for CSRF protection. It's a random string sent to the server and returned back.
  // The client should only trust the response if the returned state matches the sent state.
  const state = generateRandomUrlSafeString(16); // Generate a random state for CSRF protection

  // For developing Draft versions, include the app_version_id parameter with the draft version's ID
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

  const backToUrl = (await SecureStorageService.getInstance().get<any>(userId))?.backToUrl;
  await SecureStorageService.getInstance().set(userId, { mondayToken });

  return res.redirect(backToUrl);
});

export default authRouter;
