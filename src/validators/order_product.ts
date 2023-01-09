import { param, header, body } from 'express-validator';

export default {
  order_product: {
    add: [
      header('token')
        .exists()
        .withMessage('the Authentication token is required')
        .isString()
        .withMessage('The Authentication token should be string'),

      body('order_id')
        .exists()
        .withMessage('the order id is required')
        .isNumeric()
        .withMessage('The order id should be number'),

      body('product_id')
        .exists()
        .withMessage('the product id is required')
        .isNumeric()
        .withMessage('The product id should be number'),

      body('quantity')
        .exists()
        .withMessage('the quantity is required')
        .isNumeric()
        .withMessage('The quantity should be number')
    ]
  }
};
