import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../models/error';

/**
 * verifyAuthenticationToken check if the token in the header is valid
 * token should ex: token: Bearer <token>
 * @param req the api request
 * @param res the api response
 * @param next next ()
 */
const verifyAuthenticationToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenHeader: string = req.headers.token as string;
    const token = tokenHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    const err: CustomError = {
        statusCode: 401,
        message: 'token is invalid'
    }
   return next(err);
  }
};

export default verifyAuthenticationToken;
