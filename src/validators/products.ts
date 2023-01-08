import { param, body, header } from 'express-validator';

export default {
  products: {
    add: [
      header('token')
        .exists()
        .withMessage('the Authentication token is required')
        .isString()
        .withMessage('The Authentication token should be string'),

      body('name')
        .exists()
        .withMessage('the name is required')
        .isString()
        .withMessage('The name should be string'),

      body('price')
        .exists()
        .withMessage('the price is required')
        .isNumeric()
        .withMessage('The price should be number'),

      body('category')
        .optional()
        .isString()
        .withMessage('The category should be string')
    ],

    getById: [
      param('id')
        .exists()
        .withMessage('the product ID is required')
        .isNumeric()
        .withMessage('The product ID should be number')
    ],
    update: [
      header('token')
        .exists()
        .withMessage('the Authentication token is required')
        .isString()
        .withMessage('The Authentication token should be string'),

      body('id')
        .exists()
        .withMessage('the ID is required')
        .isNumeric()
        .withMessage('The ID should be number'),

      body('name')
        .exists()
        .withMessage('the name is required')
        .isString()
        .withMessage('The name should be string'),

      body('price')
        .exists()
        .withMessage('the price is required')
        .isNumeric()
        .withMessage('The price should be number'),

      body('category')
        .optional()
        .isString()
        .withMessage('The category should be string')
    ],
    delete: [
      header('token')
        .exists()
        .withMessage('the Authentication token is required')
        .isString()
        .withMessage('The Authentication token should be string'),

      body('id')
        .exists()
        .withMessage('the product ID is required')
        .isNumeric()
        .withMessage('The product ID should be number')
    ],
    getProductsByCategory: [
      param('category')
        .exists()
        .withMessage('the category is required')
        .isString()
        .withMessage('The category should be string')
    ]
  }
};
