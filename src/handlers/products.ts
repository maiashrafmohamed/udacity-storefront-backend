import { Product, ProductsModel } from '../models/products';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../models/error';

const products = new ProductsModel();

/**
 * index get all products
 * @param req the api request
 * @param res the api response
 */
const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProducts = await products.index();
    res.send(allProducts);
  } catch (err) {
    next(err);
  }
};

/**
 * show: get product by id
 * check if the product is exist
 * if yes return it
 * else send error product not found
 * @param req the api request
 * @param res the api response
 */

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const product = await products.show(id);
    // check if product is exist
    if (product) {
      res.send(product);
    } else {
      const error: CustomError = {
        statusCode: 404,
        message: 'Product not found'
      };
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Create new product
 * @param req the api request
 * @param res the api response
 * @param next the next function
 */

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = req.body;
    const newProduct = await products.create(product);
    res.send(newProduct);
  } catch (err) {
    next(err);
  }
};

/**
 * show: get product by category
 * check if there are products 
 * if yes return it
 * else send error products not found
 * @param req the api request
 * @param res the api response
 * @param next the next function
 */

const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = req.params.category;
    const productsByCategory = await products.getProductsByCategory(category);
    // check there are products
    if (productsByCategory.length) {
      res.send(productsByCategory);
    } else {
      const error: CustomError = {
        statusCode: 404,
        message: 'No products found'
      };
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};
/**
 * update the product data
 * check if the updated product is exist
 * if yes return it
 * else send error product not found
 * @param req the api request
 * @param res the api response
 * @param next the next function
 */
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = req.body;
    const updatedProduct = await products.update(product);
    // check if product is exist
    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      const error: CustomError = {
        statusCode: 404,
        message: 'Product not found'
      };
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * delete product
 * check if the product is exist
 * if yes return it
 * else send error product not found
 * @param req the api request
 * @param res the api response
 * @param next the next function
 */

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.id;
    const deletedProduct = await products.delete(id);
    // check if product is exist
    if (deletedProduct) {
      res.send(deletedProduct);
    } else {
      const error: CustomError = {
        statusCode: 404,
        message: 'Product not found'
      };
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};

export default { create, index, show, deleteProduct, update, getProductsByCategory };
