import supertest from 'supertest';
import app from '../../app';
import { User, UsersModel } from '../../models/users';

const request = supertest(app);
const userModel = new UsersModel();

describe('Testing Users Apis', () => {
  const user: User = {
    firstname: 'Mai2',
    lastname: 'Ashraf2',
    username: 'maiAshraf2',
    password: 'test'
  };
  let userId: number;
  let token: string;
  beforeAll(async () => {
    const res = await userModel.create(user);
    userId = res.id as number;
    const auth = await request
      .post('/api/users/authenticate')
      .send({
        username: user.username,
        password: user.password
      })
      .expect(200)
      .then((res: any) => {
        token = res._body.token;
      });
  });

  describe('Index GET api', () => {
    it('should return sucess when call index method with valid token', async () => {
      await request
        .get('/api/users')
        .set('token', `Bearer ${token}`)
        .expect(200);
    });

    it('should return failed 401 when call index method with invalid token', async () => {
      await request
        .get('/api/users')
        .set('token', `Bearer invalidToken`)
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });
  });

  describe('authenticate api', () => {
    it('should return sucess 200 and return token when call authenticate POST method with valid param', async () => {
      await request
        .post('/api/users/authenticate')
        .send({
          username: user.username,
          password: user.password
        })
        .expect(200)
        .then((res: any) => {
          expect(res._body.token).toBeDefined();
        });
    });

    it('should return failed 400 Bad request when authenticate method with invalid body', async () => {
      await request
        .post('/api/users/authenticate')
        .set('token', `Bearer ${token}`)
        .send({
          username: 'testtest22'
        })
        .expect(400);
    });
  });

  describe('Create POST  api', () => {
    it('should return sucess when call create method with valid token and param', async () => {
      await request
        .post('/api/users')
        .set('token', `Bearer ${token}`)
        .send({
          firstname: 'testcreate',
          lastname: 'lastname',
          username: 'testtest',
          password: 'test'
        })
        .expect(200)
        .then((res: any) => {
          expect(res._body.firstname).toBe('testcreate');
        });
    });

    it('should return failed 401 when call create method with invalid token', async () => {
      await request
        .post('/api/users')
        .set('token', `Bearer invalidToken`)
        .send({
          firstname: 'testcreate4',
          lastname: 'lastname',
          username: 'testtest',
          password: 'test'
        })
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });

    it('should return failed 500 when call create method with username is already added', async () => {
      await request
        .post('/api/users')
        .set('token', `Bearer ${token}`)
        .send({
          firstname: 'testcreate',
          lastname: 'lastname',
          username: 'testtest',
          password: 'test'
        })
        .expect(500)
        .then((res: any) => {
          expect(res._body.description).toBe(
            'error when add the user: Error: User is already exsist'
          );
        });
    });

    it('should return failed 400 Bad request when create method with invalid body', async () => {
      await request
        .post('/api/users/')
        .set('token', `Bearer ${token}`)
        .send({
          firstname: 'testcreate',
          lastname: 'lastname',
          username: 'testtest'
        })
        .expect(400);
    });
  });

  describe('Show GET By Id  api', () => {
    it('should return sucess when call show method with valid token and param', async () => {
      await request
        .get('/api/users/' + userId)
        .set('token', `Bearer ${token}`)
        .expect(200);
    });

    it('should return failed 401 when call show method with invalid token', async () => {
      await request
        .get('/api/users/' + userId)
        .set('token', `Bearer invalidToken`)
        .expect(401);
    });

    it('should return failed 404 when call show method with user not found', async () => {
      await request
        .get('/api/users/' + 100)
        .set('token', `Bearer ${token}`)
        .expect(404)
        .then((res: any) => {
          expect(res._body.description).toBe('User not found');
        });
    });

    it('should return failed 400 Bad request when show method with id param not with type number', async () => {
      await request
        .get('/api/users/' + 'test')
        .set('token', `Bearer ${token}`)
        .expect(400);
    });
  });

  describe('Update PUT  api', () => {
    it('should return sucess when call update method with valid token and param', async () => {
      await request
        .put('/api/users')
        .set('token', `Bearer ${token}`)
        .send({
          firstname: 'Mai3',
          lastname: 'Ashraf2',
          username: 'maiAshraf2',
          password: 'test',
          id: userId
        })
        .expect(200)
        .then((res: any) => {
          expect(res._body.firstname).toBe('Mai3');
        });
    });

    it('should return failed 401 when call update method with invalid token', async () => {
      await request
        .put('/api/users')
        .set('token', `Bearer invalidToken`)
        .send({
          firstname: 'testcreate4',
          lastname: 'lastname',
          username: 'testtest',
          password: 'test',
          id: userId
        })
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });

    it('should return failed 404 when call create method with user if not exist', async () => {
      await request
        .put('/api/users')
        .set('token', `Bearer ${token}`)
        .send({
          firstname: 'testcreate',
          lastname: 'lastname',
          username: 'testtest',
          password: 'test',
          id: 100
        })
        .expect(404)
        .then((res: any) => {
          expect(res._body.description).toBe('User not found');
        });
    });

    it('should return failed 400 Bad request when update method with invalid body', async () => {
      await request
        .put('/api/users/')
        .set('token', `Bearer ${token}`)
        .send({
          lastname: 'lastname',
          username: 'testtest',
          password: 'test'
        })
        .expect(400);
    });
  });

  describe('delete DELETE  api', () => {
    it('should return sucess when call delete method with valid token and param', async () => {
      await request
        .delete('/api/users')
        .set('token', `Bearer ${token}`)
        .send({
          id: userId
        })
        .expect(200)
        .then((res: any) => {
          expect(res._body.firstname).toBe('Mai3');
        });
    });

    it('should return failed 401 when call delete method with invalid token', async () => {
      await request
        .delete('/api/users')
        .set('token', `Bearer invalidToken`)
        .send({
          id: userId
        })
        .expect(401)
        .then((res: any) => {
          expect(res._body.description).toBe('token is invalid');
        });
    });

    it('should return failed 404 when call delete method with user if not exist', async () => {
      await request
        .delete('/api/users')
        .set('token', `Bearer ${token}`)
        .send({
          id: 100
        })
        .expect(404)
        .then((res: any) => {
          expect(res._body.description).toBe('User not found');
        });
    });

    it('should return failed 400 Bad request when delete method with invalid body', async () => {
      await request
        .delete('/api/users/')
        .set('token', `Bearer ${token}`)
        .send({
          lastname: 'lastname',
          username: 'testtest',
          password: 'test'
        })
        .expect(400);
    });
  });
});
