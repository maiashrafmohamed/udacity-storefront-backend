import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../models/error';

/**
 * handleErrors middleware send a descrptive error in the response
 * @param err the error object
 * @param req the api request
 * @param res the api response
 */
const handleErrors = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = err.statusCode || 500;
  const message: string | string[] = err.message || 'Internal Server error';
  res.status(status).json({
    status: status,
    description: message
  });
};

export default handleErrors;
