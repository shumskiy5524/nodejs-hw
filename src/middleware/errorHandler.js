import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  const isHttpError = err instanceof createHttpError.HttpError;

  const status = isHttpError ? err.status : 500;

  res.status(status).json({
    message: err.message || 'Internal Server Error',
  });
};
