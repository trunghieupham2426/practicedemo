import type { ErrorRequestHandler } from 'express';
import { Request, Response } from 'express';
import createError from 'http-errors';

// validationError
const validationError = (err: any) => {
  const message = err.details[0].message;
  //@ts-ignore
  return new createError(400, message);
};

//TokenExpiredError
const handleJWTExpiredError = () => {
  //@ts-ignore
  return new createError(401, 'Your token has expired');
};

const handleJWTError = () => {
  //@ts-ignore
  return new createError(401, 'Invalid token. Please log in again!');
};

const sendError = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // err: err,
  });
};

export const GlobalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err, message: err.message };

  switch (err.name) {
    case 'ValidationError':
      error = validationError(error);
      break;
    case 'TokenExpiredError':
      error = handleJWTExpiredError();
      break;
    case 'JsonWebTokenError':
      error = handleJWTError();
      break;
    default:
      error.message = err.message;
  }
  // send error
  sendError(error, res);
};
