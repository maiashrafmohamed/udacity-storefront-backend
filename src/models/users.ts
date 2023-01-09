import client from '../database';
import bcrypt from 'bcrypt';

export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  password: string;
  username: string;
}
const { PEPPER, SALT_ROUNDS } = process.env;

export class UsersModel {
  /**
   * index: Get all users
   * @returns array of all users
   */
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`error when to get the users: ${error}`);
    }
  }

  /**
   * show: Get user by Id
   * @param id number the id of the user
   * @returns user object
   */
  async show(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`error when get the user: ${error}`);
    }
  }

  /**
   * Create new user
   * check if username is exist before
   * if yes throw error user is already exist
   * else hash the password
   * then add user into database
   * @param user type User (firstname,lastname,password)
   * @returns user
   */
  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const searchUsersql: string =
        'SELECT password FROM users WHERE userName=($1)';
      const userExist = await connection.query(searchUsersql, [user.username]);

      if (!userExist.rows.length) {
        const sql =
          'INSERT INTO users (firstName, lastName, userName, password) VALUES($1, $2, $3, $4) RETURNING *';
        const passwordHash = bcrypt.hashSync(
          user.password + PEPPER,
          Number(SALT_ROUNDS)
        );

        const result = await connection.query(sql, [
          user.firstname,
          user.lastname,
          user.username,
          passwordHash
        ]);
        connection.release();

        return result.rows[0];
      } else {
        throw new Error('User is already exsist');
      }
    } catch (error) {
      throw new Error(`error when add the user: ${error}`);
    }
  }

  /**
   * authenticate the user when the user is logged in
   * select the password from db when the userName is exist
   * when the userName is not exist throw error user not found
   * when the userName is exist check the password is correct
   * if correct return user
   * else throw error that password is incorrect
   * @param user the username and password of the user
   * @returns Promise<User>
   */

  async authenticate(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql: string = 'SELECT password FROM users WHERE userName=($1)';

      const result = await connection.query(sql, [user.username]);

      if (result.rows.length) {
        const loggedInUser: User = result.rows[0];
        if (bcrypt.compareSync(user.password + PEPPER, loggedInUser.password)) {
          connection.release();
          
          return loggedInUser;
        } else {
          connection.release();
          throw new Error('Incorrect Password');
        }
      } else {
        connection.release();

        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error(`error when add the user: ${error}`);
    }
  }

  /**
   * update the user by id
   * @param user type User (firstname,lastname,password)
   * @returns updated user
   */
  async update(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'UPDATE users SET firstName=($1), lastName=($2), userName=($3), password=($4) WHERE id=($5) RETURNING *';
      const passwordHash = bcrypt.hashSync(
        user.password + PEPPER,
        Number(SALT_ROUNDS)
      );
      const result = await connection.query(sql, [
        user.firstname,
        user.lastname,
        user.username,
        passwordHash,
        user.id
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`error when update user : ${error}`);
    }
  }

  /**
   * delete user by id
   * @param id number the id of the user
   * @returns the deleted user
   */

  async delete(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`error when delete user: ${error}`);
    }
  }
}
