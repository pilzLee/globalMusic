const database = require("../database");
const userService = require("./user.service");
const jwt = require("jsonwebtoken");

const privateKey = "supper_private_key";

class AuthService {
  async register(args) {
    const { name, username, password } = args;
    const user = await userService.findOne(username);
    if (user) {
      throw new Error("Tài khoản đã tồn tại");
    }
    const id = Math.floor(Math.random() * 1e7);
    const query = `insert into users (id, name, username, password) values (${id}, N'${name}', '${username}', '${password}')`;
    return await database.query(query);
  }
  async login(username, password) {
    const user = await userService.findOne(username);
    if (!user || user.password.trim() !== password) {
      throw new Error("Tên đăng nhập hoặc mật khẩu sai");
    }
    return this.generateToken(user);
  }
  async generateToken(user) {
    const expiresIn = 1 * 1000 * 60 * 60 * 24; // 1 DAY
    const token = jwt.sign(
      {
        user_id: user.username,
      },
      privateKey,
      {
        expiresIn,
      }
    );
    return {
      user,
      token,
      expiresIn,
    };
  }
  async validateReq(req) {
    const cookie = req.cookies.JWTGMUSIC;
    if (!cookie) {
      return;
    }
    const auth = cookie.split(" ")[1];
    const decoded = jwt.verify(auth, privateKey);
    const user = await userService.findOne((decoded.user_id || "").trim());
    if (!user) {
      return;
    }
    return user;
  }
}

module.exports = new AuthService();
