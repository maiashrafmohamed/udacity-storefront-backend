import express from 'express';
import users from '../../handlers/users';
import userValidators from '../../validators/users';
import validate from '../../middelware/validate';
import validateAuthToken from '../../middelware/authenticate';

const router = express.Router();

/**Get all users GET /users */
router.get(
  '/',
  userValidators.users.get,
  validate,
  validateAuthToken,
  users.index
);

/** get user by Id GET /users/:id */
router.get(
  '/:id',
  userValidators.users.getById,
  validate,
  validateAuthToken,
  users.show
);

/**Create new user POST /users */
router.post(
  '/',
  userValidators.users.add,
  validate,
  validateAuthToken,
  users.create
);

/** Update user PUT /users */
router.put(
  '/',
  userValidators.users.update,
  validate,
  validateAuthToken,
  users.update
);

/**Delete user DELETE /users */
router.delete(
  '/',
  userValidators.users.delete,
  validate,
  validateAuthToken,
  users.deleteUser
);

/** authenticate user loggedin POST /users/authenticate */
router.post(
  '/authenticate',
  userValidators.users.authenticate,
  validate,
  users.authenticate
);

export default router;
