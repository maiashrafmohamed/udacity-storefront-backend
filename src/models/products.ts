import client from '../database';

export interface Product {
  id?: number;
  name: string;
  price: number;
  category?: string;
}

export class ProductsModel {
  /**
   * index: Get all products
   * @returns Promise<Product[]>
   */
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`error when to get the products: ${error}`);
    }
  }

  /**
   * show: Get product by Id
   * @param id number the id of the product
   * @returns Promise<Product>
   */
  async show(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`error when get the product: ${error}`);
    }
  }

  /**
   * Create new product
   * insert the product into database
   * @param product type Product (name,price,category)
   * @returns Promise<Product>
   */
  async create(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();

      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';

      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`error when add the product: ${error}`);
    }
  }

  /**
   * Get products by Category
   * @param category string the category pf products
   * @returns Promise<Product[]>
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql: string =
        'SELECT name, price FROM products WHERE LOWER(category)=($1)';
      const result = await connection.query(sql, [category.toLowerCase()]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`error when get the product: ${error}`);
    }
  }

  /**
   * update the product by id
   * @param product type Product (name,price,category)
   * @returns Promise<Product>
   */
  async update(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql =
        'UPDATE products SET name=($1), price=($2), category=($3) WHERE id=($4) RETURNING *';

      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
        product.id
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`error when update product : ${error}`);
    }
  }

  /**
   * delete product by id
   * @param id number the id of the product
   * @returns Promise<Product>
   */

  async delete(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`error when delete product: ${error}`);
    }
  }
}
