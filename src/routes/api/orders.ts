import express from 'express';
import orders from '../../handlers/orders';
import orderValidators from '../../validators/orders';
import validate from '../../middelware/validate';
import validateAuthToken from '../../middelware/authenticate';

const router = express.Router();

/**Create active order by userId GET /orders/active/user:userId */
router.get(
  '/active/user/:userId',
  orderValidators.orders.getOrdersByUserId,
  validate,
  validateAuthToken,
  orders.getActiveOrderByUserIdIncart
);

/**Create active order by userId GET /orders/active/user:userId */
router.get(
  '/completed/user/:userId',
  orderValidators.orders.getOrdersByUserId,
  validate,
  validateAuthToken,
  orders.getCompleltedOrdersByUserId
);

/** get all orders by user Id GET /orders/:id */
router.get(
  '/user/:userId',
  orderValidators.orders.getOrdersByUserId,
  validate,
  validateAuthToken,
  orders.getOrdersByUserId
);

/**Create new order POST /orders */
router.post(
  '/',
  orderValidators.orders.add,
  validate,
  validateAuthToken,
  orders.create
);

export default router;
