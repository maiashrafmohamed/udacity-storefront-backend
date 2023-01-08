import express from 'express';
import usersRouter from './api/users';
import productsRouter from './api/products';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);

export default router;
