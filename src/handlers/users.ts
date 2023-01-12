import { User, UsersModel } from '../models/users';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../models/error';

const users = new UsersModel();

/**
 * index get all users
 * @param req the api request
 * @param res the api response
 */
const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await users.index();
    res.send(allUsers);
  } catch (err) {
    next(err);
  }
};

/**
 * show get user by id
 * check if the user is exist
 * if yes return it
 * else send error user not found
 * @param req the api request
 * @param res the api response
 */

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const user = await users.show(id);
    // check if user is exist
    if (user) {
      res.send(user);
    } else {
      const error: CustomError = {
        statusCode: 404,
        message: 'User not found'
      };
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Create new user
 * @param req the api request
 * @param res the api response
 */

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = req.body;
    const newUser = await users.create(user);
    res.send(newUser);
  } catch (err) {
    next(err);
  }
};

/**
 * authenticate user when logged in with username and password
 * and then generate jwt token
 * and send the token
 * @param req the api request
 * @param res the api response
 */

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await users.authenticate(req.body);
    /**generate jwt token */
    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

/**
 * update the user data
 * check if the updated user is exist
 * if yes return it
 * else send error user not found
 * @param req the api request
 * @param res the api response
 */
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = req.body;
    const updatedUser = await users.update(user);
    // check if user is exist
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      const error: CustomError = {
        statusCode: 404,
        message: 'User not found'
      };
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * delete user
 * check if the user is exist
 * if yes return it
 * else send error user not found
 * @param req the api request
 * @param res the api response
 */

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.id;
    const deletedUser = await users.delete(id);
    // check if user is exist
    if (deletedUser) {
      res.send(deletedUser);
    } else {
      const error: CustomError = {
        statusCode: 404,
        message: 'User not found'
      };
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};

export default { create, index, show, deleteUser, update, authenticate };
