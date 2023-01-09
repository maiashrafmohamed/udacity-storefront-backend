import { OrdersModel, Status } from '../orders';
import { UsersModel } from '../users';
import { ProductsModel } from '../products';
import { OrderProductModel } from '../order_product';

const ordersModel = new OrdersModel();
const userModel = new UsersModel();
const productModel = new ProductsModel();
const orderProductModel = new OrderProductModel();

let orderId: number;
let userId: number;
let productId: number;

describe('OrderProduct Model', () => {
  beforeAll(async () => {
    const user = await userModel.create({
      firstname: 'firstname1',
      lastname: 'lastname2',
      username: 'username1',
      password: 'test'
    });
    userId = user.id as number;

    const product = await productModel.create({
      name: 'iphone 14 Max',
      price: 35000,
      category: 'Mobile'
    });
    productId = product.id as number;

    const res = await ordersModel.create({
      user_id: userId as number,
      status: Status.ACTIVE
    });
    orderId = res.id as number;

  });

  it('Should add product to order when call method addProductIntoOrder', async () => {
    const orderProduct = await orderProductModel.addProductIntoOrder({
      order_id: orderId as number,
      product_id: productId,
      quantity: 1
    });
    delete orderProduct.id;
    expect(orderProduct).toEqual({
      order_id: orderId as number,
      product_id: productId,
      quantity: 1

    });
  });

});
