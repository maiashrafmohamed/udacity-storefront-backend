import express from 'express';
import order_product from '../../handlers/order_product';
import orderProductValidators from '../../validators/order_product';
import validate from '../../middelware/validate';
import validateAuthToken from '../../middelware/authenticate';

const router = express.Router();

/**Create new order_product POST /order_product */
router.post(
  '/',
  orderProductValidators.order_product.add,
  validate,
  validateAuthToken,
  order_product.addProductIntoOrder
);

export default router;

