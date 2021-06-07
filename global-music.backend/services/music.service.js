const database = require("../database");
const userService = require('./user.service');

class MusicService {
  async findAll() {
    const query = "select * from music";
    const { recordset } = await database.query(query);
    return recordset;
  }
  async findOneById(id) {
    const query = `select * from music where id = ${id}`;
    const { recordset } = await database.query(query);

    const query1 = `select * from music_singer where music_id = ${id}`;
    const { recordset: recordset1 } = await database.query(query1);

    let singer = null;

    if (recordset1[0]) {
      const query2 = `select * from singer where id = ${recordset1[0].singer_id}`;
      const { recordset: recordset2 } = await database.query(query2);
      singer = recordset2[0]
    }

    return {
      ...recordset[0],
      singer,
    };
  }
  async triggerInsertMusicSinger(msId, sgId) {
    const id = Math.floor(Math.random() * 1e7);
    const query = `insert into music_singer values (${id}, ${sgId}, ${msId})`;
    try {
      await database.query(query);
    } catch (err) {
      throw new Error(err);
    }
  }
  async updateTitle(args) {
    const { title, album, musicType, lyrics, singer } = args;
    const id = Math.floor(Math.random() * 1e7);
    let query = "";
    if (album !== "0") {
      query = `insert into music (id, title, lyrics, play_times, album_id, music_type_id) values (${id}, N'${title}', N'${lyrics.replace(/'/g, "''")}', 0, ${album}, ${musicType})`;
    } else {
      query = `insert into music (id, title, lyrics, play_times, music_type_id) values (${id}, N'${title}', N'${lyrics.replace(/'/g, "''")}', 0, ${musicType})`;
    }
    await database.query(query);
    await this.triggerInsertMusicSinger(id, singer);
    return id;
  }
  async uploadFile(id, filename) {
    const query = `update music set url = '${filename}' where id = ${id}`;
    await database.query(query);
  }
  async findSongByName(args) {
    const { keyword = "", musicType, album, singer } = args;
    let query = `select * from music left join 
    music_singer on music.id = music_singer.music_id 
    left join singer on singer.id = music_singer.singer_id
    where title LIKE '%${keyword}%'`;
    if (musicType) {
      query += ` and music_type_id = ${musicType}`;
    }
    if (album) {
      query += ` and album_id = ${album}`;
    }
    if (singer) {
      query += ` and singer.id = ${singer}`;
    }
    try {
      const result = await database.query(query);
      return result.recordset;
    } catch (err) {
      return [];
    }
  }
  async delete(id) {
    // trigger delete relationship music - singer
    const query1 = `delete from music_singer where music_id = ${id}`;
    await database.query(query1);

    // execute delete
    const query = `delete from music where id = ${id}`;
    await database.query(query);
  }
  async selectTopMusic(num = 10) {
    const query = `select top ${num} * from music left join 
    music_singer on music.id = music_singer.music_id 
    left join singer on singer.id = music_singer.singer_id`;
    const { recordset } = await database.query(query);
    return recordset;
  }
  async triggerInsertMusicComment(musicId, userId, commentId) {
    const id = Math.floor(Math.random() * 1e7);
    const query = `insert into comment_music values (${id}, ${musicId}, ${commentId}, ${userId})`;
    await database.query(query);
  }
  async getCommentOnMusic(musicId) {
    const query = `select comment_id from comment_music where music_id = ${musicId}`;
    const { recordset } = await database.query(query);
    if (recordset.length === 0) {
      return [];
    }
    const commentids = recordset.map(x => x.comment_id);
    const query1 = `select * from comment left join 
    comment_music on comment.id = comment_music.comment_id 
    left join users on users.id = comment_music.users_id
    left join music on music.id = comment_music.music_id
    where comment.id in (${commentids.join(', ')})`;
    const result = await database.query(query1);
    return result.recordset;
  }
  async addComment(args) {
    const { musicId, userId, content } = args;
    const user = await userService.findOneById(userId);
    if (!user) {
      throw new Error('[User] không tồn tại');
    }
    const id = Math.floor(Math.random() * 1e7);
    const date = new Date().toLocaleDateString();
    const query = `insert into comment values (${id}, N'${content}', '${date}')`;
    await database.query(query);
    await this.triggerInsertMusicComment(musicId, userId, id);
  }
}

module.exports = new MusicService();
