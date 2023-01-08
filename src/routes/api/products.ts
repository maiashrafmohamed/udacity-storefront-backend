import express from 'express';
import products from '../../handlers/products';
import productValidators from '../../validators/products';
import validate from '../../middelware/validate';
import validateAuthToken from '../../middelware/authenticate';

const router = express.Router();

/**Get all products GET /products */
router.get('/', products.index);

/** get product by Id GET /products/:id */
router.get('/:id', productValidators.products.getById, validate, products.show);

/** get product by Category GET /products/:category */
router.get(
  '/category/:category',
  productValidators.products.getProductsByCategory,
  validate,
  products.getProductsByCategory
);

/**Create new product POST /products */
router.post(
  '/',
  productValidators.products.add,
  validate,
  validateAuthToken,
  products.create
);

/** Update product PUT /products */
router.put(
  '/',
  productValidators.products.update,
  validate,
  validateAuthToken,
  products.update
);

/**Delete product DELETE /products */
router.delete(
  '/',
  productValidators.products.delete,
  validate,
  validateAuthToken,
  products.deleteProduct
);

export default router;
