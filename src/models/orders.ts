import client from '../database';

export interface Order {
  id?: number;
  user_id: number;
  status: Status;
}

export enum Status {
  COMPLETE = 'completed',
  ACTIVE = 'active'
}

export class OrdersModel {
  /**
   * Create new order
   * insert the order into database
   * @param product type order (status, user_is)
   * @returns Promise<order>
   */
  async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect();

      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';

      const result = await connection.query(sql, [order.user_id, order.status]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`error when add the order: ${error}`);
    }
  }

  /**
   * get current active order for the user by user id
   * get the active order with the products details name price quantity and status
   * @returns Promise<Order[]>
   */
  async getActiveOrderByUserIdIncart(userID: number): Promise<any[]> {
    try {
      const connection = await client.connect();
      const query = `SELECT
          product.name AS product_name,
          product.price AS product_price,
          op.quantity AS quantity
          FROM users users
          INNER JOIN orders orders ON users.id = orders.user_id
          INNER JOIN order_product op ON op.order_id = orders.id
          INNER JOIN products product ON op.product_id = product.id
          WHERE users.id = $1 AND orders.status = 'active'
          `;

      const result = await connection.query(query, [userID]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `error when to get the active Order by user ID: ${error}`
      );
    }
  }

    /**
   * get completed orders for the user by user id
   * get the completed orders with the all products details name price quantity and status
   * @returns Promise<any[]>
   */
    async getCompleltedOrdersByUserId(userID: number): Promise<any[]> {
      try {
        const connection = await client.connect();
        const query = `SELECT
            product.name AS product_name,
            product.price AS product_price,
            op.quantity AS quantity
            FROM users users
            INNER JOIN orders orders ON users.id = orders.user_id
            INNER JOIN order_product op ON op.order_id = orders.id
            INNER JOIN products product ON op.product_id = product.id
            WHERE users.id = $1 AND orders.status = 'completed'
            `;
  
        const result = await connection.query(query, [userID]);
        connection.release();
        return result.rows;
      } catch (error) {
        throw new Error(
          `error when to get the completed Orders by user ID: ${error}`
        );
      }
    }
  

  /**
   * get all orders by user id
   * get all order with all products data name price quantity and status
   * @returns Promise<Order[]>
   */
  async getOrdersByUserId(userID: number): Promise<any[]> {
    try {
      const connection = await client.connect();
      const query = `SELECT
        product.name AS product_name,
        product.price AS product_price,
        orders.status AS order_status,
        orders.id AS order_id,
        op.quantity AS quantity
        FROM orders orders
        INNER JOIN users users ON users.id = orders.user_id
        INNER JOIN order_product op ON op.order_id = orders.id
        INNER JOIN products product ON op.product_id = product.id
        WHERE users.id = $1
        `;

        const result = await connection.query(query, [userID]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`error when to get the Orders by user ID: ${error}`);
    }
  }
}
