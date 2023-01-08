import { param, body, header } from 'express-validator';

export default {
  users: {
    get: [
      header('token')
        .exists()
        .withMessage('the Authentication token is required')
        .isString()
        .withMessage('The Authentication token should be string')
    ],
    add: [
      header('token')
        .exists()
        .withMessage('the Authentication token is required')
        .isString()
        .withMessage('The Authentication token should be string'),

      body('firstName')
        .exists()
        .withMessage('the firstName is required')
        .isString()
        .withMessage('The firstName should be string'),

      body('lastName')
        .exists()
        .withMessage('the lastName is required')
        .isString()
        .withMessage('The lastName should be string'),

      body('userName')
        .exists()
        .withMessage('the userName is required')
        .isString()
        .withMessage('The userName should be string'),

      body('password')
        .exists()
        .withMessage('the password is required')
        .isString()
        .withMessage('The password should be strong')
    ],
    authenticate: [
      body('userName')
        .exists()
        .withMessage('the userName is required')
        .isString()
        .withMessage('The userName should be string'),

      body('password')
        .exists()
        .withMessage('the password is required')
        .isString()
        .withMessage('The password should be strong')
    ],

    getById: [
      header('token')
        .exists()
        .withMessage('the Authentication token is required')
        .isString()
        .withMessage('The Authentication token should be string'),

      param('id')
        .exists()
        .withMessage('the ID is required')
        .isNumeric()
        .withMessage('The ID should be number')
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

      body('firstName')
        .exists()
        .withMessage('the firstName is required')
        .isString()
        .withMessage('The firstName should be string'),

      body('lastName')
        .exists()
        .withMessage('the lastName is required')
        .isString()
        .withMessage('The lastName should be string'),

      body('userName')
        .exists()
        .withMessage('the userName is required')
        .isString()
        .withMessage('The userName should be string'),

      body('password')
        .exists()
        .withMessage('the password is required')
        .isString()
        .withMessage('The password should be strong')
    ],
    delete: [
      header('token')
        .exists()
        .withMessage('the Authentication token is required')
        .isString()
        .withMessage('The Authentication token should be string'),

      body('id')
        .exists()
        .withMessage('the ID is required')
        .isNumeric()
        .withMessage('The ID should be number')
    ]
  }
};
