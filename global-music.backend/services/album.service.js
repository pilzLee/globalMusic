const database = require("../database");

class AlbumService {
  async findAll(num) {
    const q = 'select count(*) as count from album';
    const { recordset: recordset1 } = await database.query(q);
    const total = recordset1[0].count;

    const query = `select top ${num} * from album`;
    const { recordset } = await database.query(query);
    return {
      data: recordset,
      hasMore: num < total
    };
  }
  async findBySinger(id) {
    const query = `select * from album inner join album_singer 
    on album.id = album_singer.album_id inner join singer 
    on singer.id = album_singer.singer_id where singer.id = ${id}`;
    const { recordset } = await database.query(query);
    return recordset || [];
  }
  async findOneById(id) {
    const query = `select * from album where id = ${id}`;
    const { recordset } = await database.query(query);
    return recordset[0];
  }
  async findOneByName(name) {
    const query = `select * from album where name = N'${name}'`;
    const { recordset } = await database.query(query);
    return recordset[0];
  }
  async create(args) {
    const { name, date, singerId } = args;
    const existData = await this.findOneByName(name);
    if (existData) {
      throw new Error("exist");
    }
    const id = Math.floor(Math.random() * 1e7);
    const query = `insert into album (id, name, released_date) values (${id}, N'${name}', '${date}')`;
    await database.query(query);

    // trigger
    const id2 = Math.floor(Math.random() * 1e7);
    const query2 = `insert into album_singer values (${id2}, ${id}, ${singerId})`;
    await database.query(query2);
    return id;
  }
  async updateThumbail(id, url) {
    const query = `update album set url = '${url}' where id = ${id}`;
    return await database.query(query);
  }
  async edit(args) {
    const { id, name, date } = args;
    const query = `update set album name = N'${name}', released_date = '${date}' where id = ${id}`;
    await database.query(query);
  }
  async delete(id) {
    const query2 = `delete from album_singer where album_id = ${id}`;
    await database.query(query2);

    const query = `delete from album where id = ${id}`;
    await database.query(query);
  }
}

module.exports = new AlbumService();
