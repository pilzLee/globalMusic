const router = require("express").Router();

const authMiddleware = require("../middlewares/auth.middleware");
const AuthService = require("../services/auth.service");

module.exports = (app) => {
  app.use("/auth", router);
};

router.post("/token", async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await AuthService.login(username, password);
    res.cookie("JWTGMUSIC", "Bearer " + data.token, {
      maxAge: data.expiresIn,
      httpOnly: true,
    });
    return res.json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  const { user } = req;
  return res.json({ data: user });
});

router.post("/logout", async (req, res) => {
  res.clearCookie("JWTGMUSIC");
  return res.json({ ok: true });
});

router.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    await AuthService.register(payload);
    return res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});
