import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from '../models/error';

/**
 * validate the api request
 * check if the request has validate errors
 * then send all errors
 * else continue the request
 * @param req the request api
 * @param res the response api
 * @param next next()
 */
const validate = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  if (error.isEmpty()) {
    return next();
  }
  const err: CustomError = {
    statusCode: 400,
    message: error.array()
  };
  return next(err);
};

export default validate;
