import client from '../database';

export interface Order_Product {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
}

export class OrderProductModel {
  /**
   * add Product Into Order
   * insert the product with order into database
   * @param orderProduct type Order_Product ( order_id, product_id, quantity)
   * @returns Promise<order>
   */
  async addProductIntoOrder(
    orderProduct: Order_Product
  ): Promise<Order_Product> {
    try {
      const connection = await client.connect();

      const sql =
        'INSERT INTO order_product (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';

      const result = await connection.query(sql, [
        orderProduct.order_id,
        orderProduct.product_id,
        orderProduct.quantity
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`error when add the order_product: ${error}`);
    }
  }
}
