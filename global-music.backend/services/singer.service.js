const database = require("../database");
const musicService = require('./music.service');
class SingerService {
  async findAll(num) {
    const q = 'select count(*) as count from singer';
    const { recordset: recordset1 } = await database.query(q);
    const total = recordset1[0].count;

    const query = `select top ${num} * from singer`;
    const { recordset } = await database.query(query);
    return {
      data: recordset,
      hasMore: num < total
    };
  }
  async findOneById(id) {
    const query = `select * from singer where id = ${id}`;
    const { recordset } = await database.query(query);
    const query1 = `select * from music_singer where singer_id = ${id}`;
    const { recordset: recordset1 } = await database.query(query1);
    const musicIds = recordset1.map((x) => x.music_id);
    const musics = await Promise.all(
      musicIds.map(async (x) => await musicService.findOneById(x))
    );
    return {
      ...recordset[0],
      musics
    };
  }
  async findOneByName(name) {
    const query = `select * from singer where name = N'${name}'`;
    const { recordset } = await database.query(query);
    return recordset[0];
  }
  async create(args) {
    const { name, dob, info } = args;
    const existData = await this.findOneByName(name);
    if (existData) {
      throw new Error("exist");
    }
    const id = Math.floor(Math.random() * 1e7);
    const query = `insert into singer (id, name, dob, info) values (${id}, N'${name}', '${dob}', N'${info.replace(/'/g, "''")}')`;
    await database.query(query);
    return id;
  }
  async updateAvatar(id, url) {
    const query = `update singer set avatar = '${url}' where id = ${id}`;
    return await database.query(query);
  }
  async edit(args) {
    const { id, name, dob, info } = args;
    const query = `update singer set name = N'${name}', dob = '${dob}', info = N'${info}' where id = ${id}`;
    await database.query(query);
  }
  async delete(id) {
    const query = `delete from singer where id = ${id}`;
    await database.query(query);
  }
  async selectTop(num) {
    const query = `select top ${num} * from singer`;
    const { recordset } = await database.query(query);
    return recordset;
  }
}

module.exports = new SingerService();
