import { NextFunction, Request, Response } from 'express';
import { JWTService } from '@services/jwt.service';
import { Unauthorized } from 'http-errors';

export const mondayRequestAuth = (req: Request, res: Response, next: NextFunction) => {
  // Retrieve the token from the 'Authorization' header or 'token' or 'sessionToken' query parameters
  const token = (req.headers['authorization'] || req.query.token || req.query.sessionToken) as string | undefined;

  if (!token) {
    throw new Unauthorized('Missing Authorization Token');
  }

  const { accountId, userId, backToUrl, shortLivedToken } = JWTService.decodeMondayJWT(token);

  req.session = { accountId, userId, backToUrl, shortLivedToken };
  next();
};
