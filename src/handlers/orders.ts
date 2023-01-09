import { Order, OrdersModel } from '../models/orders';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../models/error';

const orders = new OrdersModel();

/**
 * Create new order
 * @param req the api request
 * @param res the api response
 * @param next the next function
 */

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: Order = req.body;
    const newOrder = await orders.create(order);
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
};

/**
 * get active order By UserId
 * check if the order is exist
 * if yes return it
 * else send error active order not found
 * @param req the api request
 * @param res the api response
 * @param next the next function
 */

const getActiveOrderByUserIdIncart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: number = Number(req.params.userId);
    const activeOrderWithProducts = await orders.getActiveOrderByUserIdIncart(userId);
    // check if there is active order
    if (activeOrderWithProducts.length) {
      res.send({ products: activeOrderWithProducts });
    } else {
      const error: CustomError = {
        statusCode: 404,
        message: 'No active order found'
      };
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * get Orders By UserId
 * check if the orders are exist
 * if yes return it
 * else send error orders not found
 * @param req the api request
 * @param res the api response
 * @param next the next function
 */

const getOrdersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: number = Number(req.params.userId);
    console.log(await orders.getOrdersByUserId(userId));
    const ordersByUser: Order[] = await orders.getOrdersByUserId(userId);
    // check if the orders are exist
    if (ordersByUser.length) {
      res.send(ordersByUser);
    } else {
      const error: CustomError = {
        statusCode: 404,
        message: 'No Orders found'
      };
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * get conpleted orders By UserId
 * check if the orders is exist
 * if yes return it
 * else send error active order not found
 * @param req the api request
 * @param res the api response
 * @param next the next function
 */

const getCompleltedOrdersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: number = Number(req.params.userId);
    const completedOrders = await orders.getCompleltedOrdersByUserId(userId);
    // check if there is completed orders
    if (completedOrders.length) {
      res.send(completedOrders);
    } else {
      const error: CustomError = {
        statusCode: 404,
        message: 'No completed orders found'
      };
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  create,
  getOrdersByUserId,
  getActiveOrderByUserIdIncart,
  getCompleltedOrdersByUserId
};
