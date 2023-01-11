import { OrdersModel, Status } from '../orders';
import { UsersModel } from '../users';
import { ProductsModel } from '../products';
import { OrderProductModel } from '../order_product';

const ordersModel = new OrdersModel();
const userModel = new UsersModel();
const productModel = new ProductsModel();
const orderProductModel = new OrderProductModel();

let id: number;
let userId: number;
let productId: number;

describe('Orders Model', () => {
  beforeAll(async () => {
    const user = await userModel.create({
      firstname: 'firstname',
      lastname: 'lastname',
      username: 'username',
      password: 'test'
    });
    userId = user.id as number;

    const product = await productModel.create({
      name: 'iphone 14 pro',
      price: 30000,
      category: 'Mobile'
    });
    productId = product.id as number;

    const res = await ordersModel.create({
      user_id: userId as number,
      status: Status.ACTIVE
    });
    id = res.id as number;

    await orderProductModel.addProductIntoOrder({
      order_id: id as number,
      product_id: productId,
      quantity: 2
    });
  });

  it('Shoud get all order for specific user when call getOrdersByUserId method', async () => {
    const res = await ordersModel.getOrdersByUserId(userId);
    expect(res).toEqual([
      {
        product_name: 'iphone 14 pro',
        product_price: 30000,
        quantity: 2,
        order_status: Status.ACTIVE,
        order_id: id
      }
    ]);
  });

  it('Should create new order when call create method and return added product', async () => {
    const order = await ordersModel.create({
      user_id: userId as number,
      status: Status.COMPLETE
    });
    delete order.id;
    expect(order).toEqual({
      user_id: userId as number,
      status: Status.COMPLETE
    });
  });

  it('Shoud get active order with all products for specific user when call getCompleltedOrdersByUserId method', async () => {
    const res = await ordersModel.getActiveOrderByUserIdIncart(userId);
    expect(res).toEqual([
      {
        product_name: 'iphone 14 pro',
        product_price: 30000,
        quantity: 2
      }
    ]);
  });

  it('Shoud get all completed orders with all products for specific user when call getActiveOrderByUserIdIncart method', async () => {
    const product = await productModel.create({
      name: 'laptop Dell',
      price: 30000,
      category: 'laptop'
    });

    const order = await ordersModel.create({
      user_id: userId as number,
      status: Status.COMPLETE
    });

    const orderProduct = await orderProductModel.addProductIntoOrder({
      order_id: order.id as number,
      product_id: product.id as number,
      quantity: 1
    });

    const res = await ordersModel.getCompleltedOrdersByUserId(userId);
    expect(res).toEqual([
      {
        product_name: 'laptop Dell',
        product_price: 30000,
        quantity: 1
      }
    ]);
  });
});
