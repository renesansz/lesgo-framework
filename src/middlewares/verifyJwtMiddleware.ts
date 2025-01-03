import middy from '@middy/core';
import { verify } from '../utils/jwt';
import logger from '../utils/logger';
import { LesgoException } from '../exceptions';
import { VerifyInputOptions } from '../services/JWTService/verify';

const FILE = 'lesgo.middlewares.verifyJwtMiddleware';

const verifyJwtMiddleware = (secret?: string, options?: VerifyInputOptions) => {
  const verifyJwt = (
    token: string,
    secret?: string,
    opts?: VerifyInputOptions
  ) => {
    try {
      const decoded = verify(token, secret, opts);
      return decoded;
    } catch (error: any) {
      throw new LesgoException(
        'Error verifying JWT',
        `${FILE}::ERROR_VERIFYING_JWT`,
        401,
        error
      );
    }
  };

  const verifyJwtMiddlewareBefore = (request: middy.Request) => {
    logger.debug(`${FILE}::JWT_TO_VERIFY`, { request, options });
    const token = request.event.headers.authorization;
    const forwardedOpts = {
      keyid: request.event.headers['x-site-id'],
      ...options,
    };

    if (!token) {
      throw new LesgoException(
        'No token provided',
        `${FILE}::NO_TOKEN_PROVIDED`,
        401
      );
    }

    const decoded = verifyJwt(token, secret, forwardedOpts);
    logger.debug(`${FILE}::JWT_VERIFIED`, { decoded });

    request.event.jwt = decoded;
  };

  const verifyJwtMiddlewareAfter = async (request: middy.Request) => {
    request.event = {
      ...request.event,
      extendedResponse: {
        _jwt: request.event.jwt,
      },
    };
  };

  return {
    before: verifyJwtMiddlewareBefore,
    after: verifyJwtMiddlewareAfter,
  };
};

export default verifyJwtMiddleware;
