import { param, header, body } from 'express-validator';

export default {
  orders: {
    getOrdersByUserId: [
      header('token')
        .exists()
        .withMessage('the Authentication token is required')
        .isString()
        .withMessage('The Authentication token should be string'),

      param('userId')
        .exists()
        .withMessage('the user ID is required')
        .isNumeric()
        .withMessage('The user ID should be number'),
    ],
    add: [
      header('token')
        .exists()
        .withMessage('the Authentication token is required')
        .isString()
        .withMessage('The Authentication token should be string'),

      body('user_id')
        .exists()
        .withMessage('the user id is required')
        .isNumeric()
        .withMessage('The user id should be number'),

      body('status')
        .exists()
        .withMessage('the status is required')
        .isString()
        .withMessage('The status should be string'),
    ],

  }
};
