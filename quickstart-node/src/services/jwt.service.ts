import { EnvironmentVariablesService, SecretsService } from '@services/monday-code';
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { InternalServerError, Unauthorized } from 'http-errors';
import axios from 'axios';
import { EnvironmentsKeys, SecretsKeys } from '@shared/monday-auth-consts';

export class JWTService {
  private constructor() {}

  static createJWTToken(payload: object): string {
    const signingSecret = SecretsService.getInstance().get(SecretsKeys.MONDAY_SIGNING_SECRET) as string;
    return jwt.sign(payload, signingSecret, { algorithm: 'HS256' });
  }

  static decodeMondayJWT(token: string, verify: boolean = true): JwtPayload {
    const signingSecret = SecretsService.getInstance().get(SecretsKeys.MONDAY_SIGNING_SECRET) as string;
    if (!signingSecret) {
      throw new InternalServerError('No signing secret found');
    }
    try {
      return (
        verify
          ? jwt.verify(token, signingSecret, {
              algorithms: ['HS256'],
            })
          : jwt.decode(token)
      ) as JwtPayload;
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        throw new Unauthorized('Token has expired');
      }
      if (error instanceof JsonWebTokenError) {
        throw new Unauthorized('Invalid signature, token validation failed');
      }
      throw new Unauthorized('Invalid token');
    }
  }

  static async getMondayToken(code: string): Promise<any> {
    const tokenPath = EnvironmentVariablesService.getInstance().get(EnvironmentsKeys.MONDAY_OAUTH_TOKEN_PATH) as string;
    const clientId = EnvironmentVariablesService.getInstance().get(EnvironmentsKeys.MONDAY_OAUTH_CLIENT_ID);
    const clientSecret = SecretsService.getInstance().get(SecretsKeys.MONDAY_OAUTH_CLIENT_SECRET);

    const response = await axios.post(tokenPath, {
      code: code,
      client_id: clientId,
      client_secret: clientSecret,
    });

    return response.data;
  }
}
