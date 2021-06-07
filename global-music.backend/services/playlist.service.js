const database = require("../database");
const userService = require("./user.service");
const musicService = require("./music.service");

class PlaylistService {
  async findOneById(id) {
    const query = `select * from play_list where id = ${id}`;
    let { recordset } = await database.query(query);
    if (!recordset) {
      recordset = await this.create();
    }
    const query1 = `select * from play_list_music where play_list_id = ${id}`;
    const { recordset: recordset1 } = await database.query(query1);
    const musicIds = recordset1.map((x) => x.music_id);
    const musics = await Promise.all(
      musicIds.map(async (x) => await musicService.findOneById(x))
    );

    return {
      ...recordset[0],
      musics,
    };
  }
  async findAll(userId) {
    const query = `select * from play_list where users_id = ${userId}`;
    let { recordset } = await database.query(query);
    return recordset;
  }
  async create(args) {
    const { userId, name } = args;
    const user = await userService.findOneById(userId);
    if (!user) {
      const query = `insert into users values (${userId}, '', '', '', '', 0)`;
      await database.query(query);
    }
    const id = Math.floor(Math.random() * 1e7);
    const query = `insert into play_list values (${id}, ${userId}, N'${name}')`;
    return await database.query(query);
  }
  async edit(args) {
    const { id, name } = args;
    const query = `update play_list set name = N'${name}' where id = ${id}`;
    await database.query(query);
  }
  async triggerDeletePlaylistMusic(id) {
    const query = `delete from play_list_music where play_list_id = ${id}`;
    await database.query(query);
  }
  async delete(id) {
    const query = `delete from play_list where id = ${id}`;
    await this.triggerDeletePlaylistMusic(id);
    await database.query(query);
  }
  async addMusic(args) {
    const { playListId, musicId } = args;
    const qr = `select * from play_list_music where play_list_id = ${playListId} and music_id = ${musicId}`;
    const { recordset } = await database.query(qr);
    if (recordset.length > 0) {
      throw new Error("Bài hát đã được thêm vào playlist");
    }
    const id = Math.floor(Math.random() * 1e7);
    const query = `insert into play_list_music values (${id}, ${playListId}, ${musicId})`;
    await database.query(query);
  }
  async removeMusic(args) {
    const { playListId, musicId } = args;
    const query = `delete from play_list_music where play_list_id = ${playListId} and music_id = ${musicId}`;
    await database.query(query);
  }
}

module.exports = new PlaylistService();
