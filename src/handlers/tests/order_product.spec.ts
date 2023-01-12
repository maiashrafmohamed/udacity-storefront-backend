import supertest from 'supertest';
import app from '../../app';
import { User, UsersModel } from '../../models/users';
import { Status } from '../../models/orders';

const request = supertest(app);
const userModel = new UsersModel();

describe('Testing Order_producst Api', () => {
  const user: User = {
    firstname: 'Mai4',
    lastname: 'Ashraf5',
    username: 'maiAshraf5',
    password: 'test'
  };
  let productId: number;
  let orderId: number;
  let userId: number;
  let token: string;
  beforeAll(async () => {
    const users = await userModel.create(user);
    userId = users.id as number;
    await request
      .post('/api/users/login/authenticate')
      .send({
        username: user.username,
        password: user.password
      })
      .expect(200)
      .then((res: any) => {
        token = res._body.token;
      });

    const product = await request
      .post('/api/products')
      .set('token', `Bearer ${token}`)
      .send({
        name: 'iphone 12',
        price: 25000,
        category: 'Mobile'
      })
      .expect(200)
      .then((res: any) => {
        productId = res._body.id as number;
      });

    await request
      .post('/api/orders')
      .set('token', `Bearer ${token}`)
      .send({
        user_id: userId,
        status: Status.ACTIVE
      })
      .expect(200)
      .then((res: any) => {
        orderId = res._body.id;
      });

    await request
      .post('/api/order_product')
      .set('token', `Bearer ${token}`)
      .send({
        product_id: productId,
        order_id: orderId,
        quantity: 2
      })
      .expect(200);
  });

  describe('Create addProductIntoOrder POST  api', () => {
    it('should return sucess when call create addProductIntoOrder method with valid token and param', async () => {
      await request
        .post('/api/order_product')
        .set('token', `Bearer ${token}`)
        .send({
          product_id: productId,
          order_id: orderId,
          quantity: 2
        })
        .expect(200);
    });

    it('should return failed 401 when call create addProductIntoOrder method with invalid token', async () => {
      await request
        .post('/api/order_product')
        .set('token', `Bearer invalidToken`)
        .send({
          product_id: productId,
          order_id: orderId,
          quantity: 2
        })
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });

    it('should return failed 400 Bad request when create addProductIntoOrder method with invalid body', async () => {
      await request
        .post('/api/order_product')
        .set('token', `Bearer ${token}`)
        .send({
          product_id: productId,
          quantity: 2
        })
        .expect(400);
    });
  });
});
