import supertest from 'supertest';
import app from '../../app';
import { User, UsersModel } from '../../models/users';
import { Status } from '../../models/orders';

const request = supertest(app);
const userModel = new UsersModel();

describe('Testing Orders Apis', () => {
  const user: User = {
    firstname: 'Mai4',
    lastname: 'Ashraf4',
    username: 'maiAshraf4',
    password: 'test'
  };
  let productId: number;
  let orderId: number;
  let userId: number;
  let token: string;
  let orderIdCompleted: number;
  beforeAll(async () => {
    const users = await userModel.create(user);
    userId = users.id as number;
    await request
      .post('/api/users/authenticate')
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

  describe('Create POST  api', () => {
    it('should return sucess when call create method with valid token and param', async () => {
      await request
        .post('/api/orders')
        .set('token', `Bearer ${token}`)
        .send({
          user_id: userId,
          status: Status.COMPLETE
        })
        .expect(200)
        .then((res: any) => {
          orderIdCompleted = res._body.id;
          expect(res._body.status).toBe(Status.COMPLETE);
        });
    });

    it('should return failed 401 when call create method with invalid token', async () => {
      await request
        .post('/api/orders')
        .set('token', `Bearer invalidToken`)
        .send({
          user_id: userId,
          status: Status.ACTIVE
        })
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });

    it('should return failed 400 Bad request when create method with invalid body', async () => {
      await request
        .post('/api/orders')
        .set('token', `Bearer ${token}`)
        .send({
          status: Status.ACTIVE
        })
        .expect(400);
    });
  });

  describe('Create getActiveOrderByUserIdIncart GET api', () => {
    it('should return sucess will active order with order details when call getActiveOrderByUserIdIncart method with valid token and param', async () => {
      await request
        .get('/api/orders/active/user/' + userId)
        .set('token', `Bearer ${token}`)
        .expect(200)
        .then((res: any) => {
          expect(res._body.products[0].product_name).toBe('iphone 12');
        });
    });

    it('should return failed 401 when call create getActiveOrderByUserIdIncart with invalid token', async () => {
      await request
        .get('/api/orders/active/user/' + userId)
        .set('token', `Bearer invalidToken`)
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });

    it('should return failed 400 Bad request when getActiveOrderByUserIdIncart method with invalid param id with type not number', async () => {
      await request
        .get('/api/orders/active/user/' + 'test')
        .set('token', `Bearer ${token}`)
        .expect(400);
    });

    it('should return failed 404 Bad request when getActiveOrderByUserIdIncart method with user with no active order', async () => {
      const users = await userModel.create({
        firstname: 'test4',
        lastname: 'testlastname',
        username: 'testusername',
        password: 'test'
      });

      await request
        .get('/api/orders/active/user/' + users.id)
        .set('token', `Bearer ${token}`)
        .expect(404)
        .then((res: any) => {
          expect(res._body.description).toBe('No active order found');
        });
    });
  });

  describe('Create getCompleltedOrdersByUserId GET api', () => {
    it('should return sucess with all completed orders with order details when call getCompleltedOrdersByUserId method with valid token and param', async () => {
      let comProductId;
      let comOrderId;
      await request
        .post('/api/products')
        .set('token', `Bearer ${token}`)
        .send({
          name: 'samsung Note 10',
          price: 20000,
          category: 'Mobile'
        })
        .then((res: any) => {
          comProductId = res._body.id as number;
        });

      await request
        .post('/api/orders')
        .set('token', `Bearer ${token}`)
        .send({
          user_id: userId,
          status: Status.COMPLETE
        })
        .then((res: any) => {
          comOrderId = res._body.id;
        });

      await request
        .post('/api/order_product')
        .set('token', `Bearer ${token}`)
        .send({
          product_id: comProductId,
          order_id: comOrderId,
          quantity: 1
        });

      await request
        .get('/api/orders/completed/user/' + userId)
        .set('token', `Bearer ${token}`)
        .expect(200)
        .then((res: any) => {
          expect(res._body[0].product_name).toBe('samsung Note 10');
        });
    });

    it('should return failed 401 when call create getCompleltedOrdersByUserId with invalid token', async () => {
      await request
        .get('/api/orders/completed/user/' + userId)
        .set('token', `Bearer invalidToken`)
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });

    it('should return failed 400 Bad request when getCompleltedOrdersByUserId method with invalid param id with type not number', async () => {
      await request
        .get('/api/orders/completed/user/' + 'test')
        .set('token', `Bearer ${token}`)
        .expect(400);
    });

    it('should return failed 404 Bad request when getCompleltedOrdersByUserId method with user with no completed orders', async () => {
      const users = await userModel.create({
        firstname: 'test4',
        lastname: 'testlastname',
        username: 'testusername5',
        password: 'test'
      });

      await request
        .get('/api/orders/completed/user/' + users.id)
        .set('token', `Bearer ${token}`)
        .expect(404)
        .then((res: any) => {
          expect(res._body.description).toBe('No completed orders found');
        });
    });
  });

  describe('Create getOrdersByUserId GET api', () => {
    it('should return sucess with all orders with order details when call getOrdersByUserId method with valid token and param', async () => {
      await request
        .get('/api/orders/user/' + userId)
        .set('token', `Bearer ${token}`)
        .expect(200)
        .then((res: any) => {
          expect(res._body.length).toBeDefined();
        });
    });

    it('should return failed 401 when call create getOrdersByUserId with invalid token', async () => {
      await request
        .get('/api/orders/user/' + userId)
        .set('token', `Bearer invalidToken`)
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });

    it('should return failed 400 Bad request when getOrdersByUserId method with invalid param id with type not number', async () => {
      await request
        .get('/api/orders/completed/user/' + 'test')
        .set('token', `Bearer ${token}`)
        .expect(400);
    });

    it('should return failed 404 Bad request when getOrdersByUserId method with user with no orders', async () => {
      const users = await userModel.create({
        firstname: 'test4',
        lastname: 'testlastname',
        username: 'testusername1',
        password: 'test'
      });

      await request
        .get('/api/orders/user/' + users.id)
        .set('token', `Bearer ${token}`)
        .expect(404)
        .then((res: any) => {
          expect(res._body.description).toBe('No Orders found');
        });
    });
  });
});
