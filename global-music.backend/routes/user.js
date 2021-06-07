const router = require("express").Router();
const multer = require("multer");

const authMiddleware = require("../middlewares/auth.middleware");
const userService = require("../services/user.service");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage });

module.exports = (app) => {
  app.use("/user", router);
};

router.get('/', async (req, res) => {
  res.render('manage-user');
});

router.get("/list", async (req, res) => {
  try {
    const data = await userService.findAll();
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.post('/create', async (req, res) => {
  try {
    const payload = req.body;
    await userService.register(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await userService.delete(id);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.put('/edit', async (req, res) => {
  try {
    const payload = req.body;
    await userService.edit(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.put("/avatar/:id", upload.single("avatar"), async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  await userService.updateAvatar(id, filename);
  res.json({ message: filename });
});
