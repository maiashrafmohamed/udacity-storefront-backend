import express from 'express';
import usersRouter from './api/users';
import productsRouter from './api/products';
import ordersRouter from './api/orders';
import orderProductRouter from './api/order_product';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
router.use('/order_product', orderProductRouter);

export default router;
