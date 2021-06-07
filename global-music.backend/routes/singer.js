const router = require("express").Router();
const multer = require("multer");
const singerService = require("../services/singer.service");

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
  app.use("/singer", router);
};

router.get("/", (req, res) => {
  res.render("manage-singer");
});

router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await singerService.findOneById(id);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.get("/list/:num?", async (req, res) => {
  const { num } = req.params;
  try {
    const itemPerPage = 8 * num || 100;
    const data = await singerService.findAll(itemPerPage);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const data = await singerService.create(payload);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.post("/avatar/:id", upload.single("avatar"), async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  await singerService.updateAvatar(id, filename);
  res.json({ message: filename });
});

router.put("/update", async (req, res) => {
  const payload = req.body;
  try {
    await singerService.edit(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await singerService.delete(id);
    return res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});

router.get('/top/:num', async (req, res) => {
  const { num } = req.params;
  try {
    const data = await singerService.selectTop(num);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: String(err) });
  }
});