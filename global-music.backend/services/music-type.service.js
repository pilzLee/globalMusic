const database = require("../database");

class MusicTypeService {
  async findAll() {
    const query = "select * from music_type";
    const { recordset } = await database.query(query);
    return recordset;
  }
  async findOneById(id) {
    const query = `select * from music_type where id = ${id}`;
    const { recordset } = await database.query(query);
    return recordset[0];
  }
  async findOneByName(name) {
    const query = `select * from music_type where name = N'${name}'`;
    const { recordset } = await database.query(query);
    return recordset[0];
  }
  async create(name) {
    const existData = await this.findOneByName(name);
    if (existData) {
      throw new Error("exist");
    }
    const id = Math.floor(Math.random() * 1e7);
    const query = `insert into music_type values (${id}, N'${name}')`;
    await database.query(query);
  }
  async edit(args) {
    const { id, name } = args;
    const query = `update music_type set name = N'${name}' where id = ${id}`;
    await database.query(query);
  }
  async delete(id) {
    const query = `delete from music_type where id = ${id}`;
    await database.query(query);
  }
}

module.exports = new MusicTypeService();
