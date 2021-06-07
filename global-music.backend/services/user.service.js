const database = require("../database");

class UserService {
  async findOneById(id) {
    const query = `select * from users where id = '${id}'`;
    const { recordset } = await database.query(query);
    return recordset[0];
  }
  async findOne(username) {
    const query = `select * from users where username = '${username}'`;
    const { recordset } = await database.query(query);
    return recordset[0];
  }
  async login(args) {
    const { username, password } = args;
    const user = await this.findOne(username);
    if (!user || password !== user.password) {
      throw new Error("Tên đăng nhập hoặc tài khoản không chính xác");
    }
    return user;
  }
  async register(args) {
    const { name, username, password } = args;
    const existData = await this.findOne(username);
    if (existData) {
      throw new Error("exist");
    }
    const id = Math.floor(Math.random() * 1e7);
    const query = `insert into users (id, name, username, password, is_supper_user) values (${id}, N'${name}', '${username}', '${password}', 0)`;
    return await database.query(query);
  }
  async updateAvatar(id, url) {
    const query = `update users set avatar = '${url}' where id = ${id}`;
    return await database.query(query);
  }
  async findAll() {
    const query = `select * from users`;
    const { recordset } = await database.query(query);
    return recordset;
  }
  async delete(id) {
    const query = `delete from users where id = ${id}`;
    return await database.query(query);
  }
  async edit(args) {
    const { id, name, password } = args;
    const query = `update users set name = N'${name}', password = ${password} where id = ${id}`;
    return await database.query(query);
  }
}

module.exports = new UserService();
