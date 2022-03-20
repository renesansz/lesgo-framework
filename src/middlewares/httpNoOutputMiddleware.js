import app from 'Config/app'; // eslint-disable-line import/no-unresolved
import { normalizeHttpRequestBeforeHandler } from './normalizeHttpRequestMiddleware';
import { successHttpResponseHandler } from './successHttpResponseMiddleware';
import { errorHttpResponseHandler } from './errorHttpResponseMiddleware';

const successHttpNoOutputResponseHandler = async opts => {
  const { queryStringParameters } = opts.event;
  const debug =
    queryStringParameters && queryStringParameters.debug && app.debug;
  const response = await successHttpResponseHandler(opts);

  /* istanbul ignore next */
  if (!debug || !opts.allowDebug(opts)) {
    response.body = null;
  }

  return response;
};

export const successHttpNoOutputResponseAfterHandler = async (
  handler,
  next,
  opts
) => {
  const defaults = {
    response: handler.response,
    event: handler.event,
    allowDebug: () => true,
  };
  const options = { ...defaults, ...opts };

  // eslint-disable-next-line no-param-reassign
  handler.response = await successHttpNoOutputResponseHandler(options);

  /* istanbul ignore next */
  next();
};

const errorHttpResponseNoOutputHandler = async opts => {
  const { queryStringParameters } = opts.event;
  const debug =
    queryStringParameters && queryStringParameters.debug && app.debug;
  const response = await errorHttpResponseHandler({
    ...opts,
    debugMode: opts.debugMode || debug,
  });

  if (!debug || !opts.allowDebug(opts)) {
    response.statusCode = 200;
    response.body = null;
  }

  return response;
};

export const errorHttpNoOutputResponseAfterHandler = async (
  handler,
  next,
  opts
) => {
  const defaults = {
    error: handler.error,
    event: handler.event,
    logger: console.error, // eslint-disable-line no-console
    allowDebug: () => true,
  };

  const options = { ...defaults, ...opts };

  // eslint-disable-next-line no-param-reassign
  handler.response = await errorHttpResponseNoOutputHandler(options);
  /* istanbul ignore next */
  next();
};

const httpNoOutputMiddleware = opts => {
  return {
    before: (handler, next) => normalizeHttpRequestBeforeHandler(handler, next),
    after: (handler, next) =>
      successHttpNoOutputResponseAfterHandler(handler, next, opts),
    onError: (handler, next) =>
      errorHttpNoOutputResponseAfterHandler(handler, next, opts),
  };
};

export default httpNoOutputMiddleware;
