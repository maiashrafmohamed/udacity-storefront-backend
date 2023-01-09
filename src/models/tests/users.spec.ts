import { UsersModel } from '../users';

const userModel = new UsersModel();
let id: number;

describe('Users Model', () => {
  beforeAll(async () => {
    const res = await userModel.create({
      firstname: 'mai',
      lastname: 'ashraf',
      username: 'maiAshraf',
      password: 'test'
    });
    id = res.id as number;
  });

  it('Shoud get all users with hashed password when call index method', async () => {
    const users = await userModel.index();
    delete users[0].id;
    expect(users.length).toBe(1);
    expect(users[0].firstname).toBe('mai');
    expect(users[0].lastname).toBe('ashraf');
    expect(users[0].username).toBe('maiAshraf');
  });

  it('Should create new user when call create method and return added user with hashed password', async () => {
    const user = await userModel.create({
      firstname: 'user2',
      lastname: 'user2Lastname',
      username: 'user2Test',
      password: 'test'
    });

    expect(user.firstname).toBe('user2');
    expect(user.lastname).toBe('user2Lastname');
    expect(user.username).toBe('user2Test');
  });

  it('should return a specific user when call get user by id show method', async () => {
    const user = await userModel.show(id);

    expect(user.firstname).toBe('mai');
    expect(user.lastname).toBe('ashraf');
    expect(user.username).toBe('maiAshraf');
  });

  it('should return a user when call authenticate method when user login', async () => {
    const user = await userModel.authenticate({
      username: 'maiAshraf',
      password: 'test'
    });

    expect(user.password).toBeDefined();
  });

  it('should update a specific user when call update method', async () => {
    const user = await userModel.update({
      firstname: 'Mai',
      lastname: 'Ashraf',
      username: 'MaiAshraf',
      password: 'test',
      id: id
    });

    expect(user.firstname).toBe('Mai');
    expect(user.lastname).toBe('Ashraf');
    expect(user.username).toBe('MaiAshraf');
  });

  it('should DELETE a specific user when call delete method', async () => {
    const user = await userModel.delete(id);

    expect(user.firstname).toBe('Mai');
    expect(user.lastname).toBe('Ashraf');
    expect(user.username).toBe('MaiAshraf');
  });

});
