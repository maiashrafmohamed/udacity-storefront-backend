import { Order_Product, OrderProductModel } from '../models/order_product';
import { Request, Response, NextFunction } from 'express';

const orderProduct = new OrderProductModel();

/**
 * Create new order
 * @param req the api request
 * @param res the api response
 * @param next the next function
 */

const addProductIntoOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order: Order_Product = req.body;
    const newOrder = await orderProduct.addProductIntoOrder(order);
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
};

export default { addProductIntoOrder };
