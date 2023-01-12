import supertest from 'supertest';
import app from '../../app';
import { User, UsersModel } from '../../models/users';

const request = supertest(app);
const userModel = new UsersModel();

describe('Testing Products Apis', () => {
  const user: User = {
    firstname: 'Mai3',
    lastname: 'Ashraf3',
    username: 'maiAshraf3',
    password: 'test'
  };
  let productId: number;
  let token: string;
  beforeAll(async () => {
    await userModel.create(user);
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
  });

  describe('Create POST  api', () => {
    it('should return sucess when call create method with valid token and param', async () => {
      await request
        .post('/api/products')
        .set('token', `Bearer ${token}`)
        .send({
          name: 'iphone 13',
          price: 25000,
          category: 'Mobile'
        })
        .expect(200)
        .then((res: any) => {
          productId = res._body.id;
          expect(res._body.name).toBe('iphone 13');
        });
    });

    it('should return failed 401 when call create method with invalid token', async () => {
      await request
        .post('/api/products')
        .set('token', `Bearer invalidToken`)
        .send({
          name: 'iphone 13',
          price: 25000,
          category: 'Mobile'
        })
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });

    it('should return failed 400 Bad request when create method with invalid body', async () => {
      await request
        .post('/api/products')
        .set('token', `Bearer ${token}`)
        .send({
          name: 'iphone 13',
          category: 'Mobile'
        })
        .expect(400);
    });
  });

  describe('Index GET api', () => {
    it('should return sucess when call index method with valid token', async () => {
      await request
        .get('/api/products')
        .set('token', `Bearer ${token}`)
        .expect(200);
    });
  });

  describe('getProductsByCategory GET api', () => {
    it('should return sucess and return product with same category when call getProductsByCategory method with valid token', async () => {
      await request
        .get('/api/products/category/Mobile')
        .expect(200)
        .then((res: any) => {
          expect(res._body[0].name).toBeDefined();
        });
    });

    it('should return failed 404 when call getProductsByCategory method with category not found', async () => {
      await request
        .get('/api/products/category/test')
        .expect(404)
        .then((res: any) => {
          expect(res._body.description).toBe('No products found');
        });
    });

    it('should return failed 400 Bad request when getProductsByCategory method with category param not with type string', async () => {
      await request.get('/api/products/category/').expect(400);
    });
  });

  describe('Show GET By Id  api', () => {
    it('should return sucess when call show method with valid token and param', async () => {
      await request.get('/api/products/' + productId).expect(200);
    });

    it('should return failed 404 when call show method with product not found', async () => {
      await request
        .get('/api/products/' + 100)
        .expect(404)
        .then((res: any) => {
          expect(res._body.description).toBe('Product not found');
        });
    });

    it('should return failed 400 Bad request when show method with id param not with type number', async () => {
      await request
        .get('/api/products/' + 'test')
        .set('token', `Bearer ${token}`)
        .expect(400);
    });
  });

  describe('Update PUT  api', () => {
    it('should return sucess when call update method with valid token and param', async () => {
      await request
        .put('/api/products')
        .set('token', `Bearer ${token}`)
        .send({
          name: 'iphone 13 pro Max',
          price: 25000,
          category: 'Mobile',
          id: productId
        })
        .expect(200)
        .then((res: any) => {
          expect(res._body.name).toBe('iphone 13 pro Max');
        });
    });

    it('should return failed 401 when call update method with invalid token', async () => {
      await request
        .put('/api/products')
        .set('token', `Bearer invalidToken`)
        .send({
          name: 'iphone 13 pro Max',
          price: 25000,
          category: 'Mobile',
          id: productId
        })
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });

    it('should return failed 404 when call create method with product if not exist', async () => {
      await request
        .put('/api/products')
        .set('token', `Bearer ${token}`)
        .send({
          name: 'iphone 13 pro Max',
          price: 25000,
          category: 'Mobile',
          id: 100
        })
        .expect(404)
        .then((res: any) => {
          expect(res._body.description).toBe('Product not found');
        });
    });

    it('should return failed 400 Bad request when update method with invalid body', async () => {
      await request
        .put('/api/products/')
        .set('token', `Bearer ${token}`)
        .send({
          name: 'iphone 13 pro Max',
          price: 25000,
          category: 'Mobile'
        })
        .expect(400);
    });
  });

  describe('delete DELETE  api', () => {
    it('should return sucess when call delete method with valid token and param', async () => {
      await request
        .delete('/api/products')
        .set('token', `Bearer ${token}`)
        .send({
          id: productId
        })
        .expect(200);
    });

    it('should return failed 401 when call delete method with invalid token', async () => {
      await request
        .delete('/api/products')
        .set('token', `Bearer invalidToken`)
        .send({
          id: productId
        })
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });

    it('should return failed 404 when call delete method with product if not exist', async () => {
      await request
        .delete('/api/products')
        .set('token', `Bearer ${token}`)
        .send({
          id: 100
        })
        .expect(404)
        .then((res: any) => {
          expect(res._body.description).toBe('Product not found');
        });
    });

    it('should return failed 400 Bad request when delete method with invalid body', async () => {
      await request
        .delete('/api/products/')
        .set('token', `Bearer ${token}`)
        .send({})
        .expect(400);
    });
  });
});
